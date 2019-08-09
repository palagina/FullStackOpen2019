const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    required: true,
  },
  author: {
    type: String,
    minlength: 2,
    required: true
  },
  url: String,
  likes: Number
})

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Post", postSchema)
