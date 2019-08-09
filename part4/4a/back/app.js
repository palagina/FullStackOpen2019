const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")
const postsRouter = require("./controllers/posts")
const middleware = require("./utils/middleware")
const config = require("./utils/config")

console.log("connecting to", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.static("build"))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use("/api/posts", postsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app