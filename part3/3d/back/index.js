require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const Name = require("./models/name")

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("build"))

app.use(morgan("tiny"))
morgan.token("body", req => JSON.stringify(req.body))
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body ")
)
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>")
})

app.get("/info", (req, res) => {
  Name.countDocuments({}).then(count => {
    const info = {
      text: `Phonenook has info for ${count} people`,
      date: new Date()
    }
    res.send(
      `<p>${info.text}</p>
  <p>${info.date}</p>`
    )
  })
})

app.get("/api/names", (req, res) => {
  Name.find({}).then(names => {
    res.json(names)
  })
})

app.get("/api/names/:id", (request, response, next) => {
  Name.findById(request.params.id)
    .then(name => {
      if (name) {
        response.json(name.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post("/api/names", (request, response, next) => {
  const body = request.body
  if (body.name === undefined) {
    return response.status(400).json({ error: "Name missing" })
  }
  const name = new Name({
    name: body.name,
    number: body.number
  })
  name
    .save()
    .then(savedName => savedName.toJSON())
    .then(savedAndFormattedName => {
      response.json(savedAndFormattedName)
    })
    .catch(error => next(error))
})

app.delete("/api/names/:id", (request, response, next) => {
  Name.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put("/api/names/:id", (request, response, next) => {
  const body = request.body
  const name = {
    name: body.name,
    number: body.number
  }
  Name.findByIdAndUpdate(request.params.id, name, {
    new: true,
    runValidators: true,
    context: "query"
  })
    .then(updatedName => {
      response.json(updatedName.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)

//Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
