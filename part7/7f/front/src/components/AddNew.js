import React from "react"
import { connect } from "react-redux"
import { createPost, updatePost } from "../reducers/postReducer"
import postService from "../services/posts"
import { newPost_notify, updatePost_notify } from "../reducers/notificationReducer"
import { error } from "../reducers/errorReducer"

const AddNew = props => {
  const { title, author, url } = props
  const handleData = async event => {
    event.preventDefault()
    const postObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0
    }
    event.target.title.value = " "
    event.target.author.value = " "
    event.target.url.value = " "
    const postMatch = await checkExisting(postObject.title)
    postMatch === undefined
      ? addPost(postObject)
      : updatePost(postMatch, postObject)

  }

  const checkExisting = async newTitle => {
    const posts = await postService.getAll()
    const titleMatch = await posts.find(post =>
      post !== undefined ? post.title === newTitle : undefined
    )
    return titleMatch
  }

  const addPost = async postObject => {
    try {
      await props.createPost(postObject)
      props.newPost_notify(postObject.title, 20)
    } catch (error) {
      console.log(error.response.data.error)
      props.error(error.response.data.error, 30)
    }
  }

  const updatePost = async (postMatch, postObject) => {
    if (
      window.confirm(
        `${postMatch.title} already exists. Do you want to replace it?`
      )
    ) {
      try {
        await props.updatePost(postMatch.id, postObject)
        props.updatePost_notify(postObject.title, 30)
      } catch (error) {
        props.error(error.response.data.error, 30)
      }
    }
  }

  return (
    <div>
      <h3>Create new post</h3>
      <form onSubmit={handleData} id="addForm">
        <div>
          Title: <input name="title" {...title} />
        </div>
        <div>
          Author: <input name="author" {...author} />
        </div>
        <div>
          URL: <input name="url" {...url} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createPost, updatePost, newPost_notify, updatePost_notify, error,
}

export default connect(
  null,
  mapDispatchToProps
)(AddNew)