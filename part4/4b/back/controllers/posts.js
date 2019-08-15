const postsRouter = require("express").Router()
const Post = require("../models/post")

postsRouter.get("/", async (request, response, next) => {
  try {
    const posts = await Post.find({})
    response.json(posts.map(post => post.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

postsRouter.get("/:id", async (request, response, next) => {
  try {
    const post = await Post.findById(request.params.id)
    if (post) {
      response.json(post.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

postsRouter.post("/", async (request, response, next) => {
  const body = request.body
  if(!body.likes){ body.likes = 0 }
  const post = new Post({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  try {
    const savedPost = await post.save()
    response.json(savedPost.toJSON())
  } catch (exception) {
    next(exception)
  }
})

postsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Post.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

postsRouter.put("/:id", async (request, response, next) => {
  const post = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  try {
    const match = await Post.findById(request.params.id)
    !post.title ? post.likes=match.likes : {}
    !post.author ? post.author=match.author : {}
    !post.url ? post.url=match.url : {}
    !post.likes ? post.likes=match.likes : {}
    const updatedPost = await Post.findByIdAndUpdate(request.params.id, post, { new: true })
    response.json(updatedPost.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = postsRouter
