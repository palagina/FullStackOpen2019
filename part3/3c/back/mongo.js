 const mongoose = require("mongoose");

 if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
 const url = `mongodb+srv://fullstack:<password>@cluster0-wafva.mongodb.net/name-app?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true });

const nameSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Name = mongoose.model("Name", nameSchema);

const name = new Name({
  name: process.argv[3],
  number: process.argv[4]
});
if (name.name === undefined && password !== undefined) {
  console.log("Phonebook:");
  Name.find({}).then(result => {
    result.forEach(name => {
      console.log(`${name.name} ${name.number}`);
    });
    mongoose.connection.close();
  });
} else {
  name.save().then(response => {
    console.log(`added ${name.name} number ${name.number} to phonebook`);
    mongoose.connection.close();
  });
}
