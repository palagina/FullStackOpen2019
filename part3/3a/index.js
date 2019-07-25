const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require('morgan');
app.use(bodyParser.json());

app.use(morgan('tiny'))
morgan.token('body', ((req) => JSON.stringify(req.body)));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '));

let names = [
  { name: "Arto Hellas", number: "040-123456", id: 1 },
  { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 }
];

const generateId = () => {
  const maxId = names.length > 0 ? Math.max(...names.map(n => n.id)) : 0;
  return maxId + 1;
};

const getInfo = () => {
  const nameCount = names.length;
  const info = {
    text: `Phonenook has info for ${nameCount} people`,
    date: new Date()
  };
  return info;
};

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
  res.send(`<p>${getInfo().text}</p>
  <p>${getInfo().date}</p>`);
});

app.get("/api/names", (req, res) => {
  res.json(names);
});

app.get("/api/names/:id", (request, response) => {
  const id = Number(request.params.id);
  const name = names.find(name => name.id === id);
  if (name) {
    response.json(name);
  } else {
    response.status(404).end();
  }
});

const checkExisting = (newName) => {
  const match = names.find (person => person.name === newName)
   if (match) {
    return true
  } else { 
    return false
   } 
}

app.post("/api/names", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "Name is required"
    });
  }
  if (checkExisting(body.name) === false) {
    const name = {
      name: body.name,
      number: body.number,
      id: generateId()
    };
    names = names.concat(name);
    response.json(name);
  } else {
    response.status(400).json({
      error: "Name must be unique"
    });
  }
});

app.delete("/api/names/:id", (request, response) => {
  const id = Number(request.params.id);
  names = names.filter(name => name.id !== id);
  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
