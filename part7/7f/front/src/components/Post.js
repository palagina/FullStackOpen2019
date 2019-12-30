import React, { useEffect } from "react"
import { connect } from "react-redux"
import { updateLikes, deletePost } from "../reducers/postReducer"
import { like_notification, delete_notification  } from "../reducers/notificationReducer"
import { error } from "../reducers/errorReducer"
import { withRouter } from "react-router-dom"
import Comments from "./Comments"

const PostNoHistory = (props) => {
  const { post, user } = props

  const giveLike = () => {
    try {
      props.updateLikes(post)
      props.like_notification(post.title, 20)
    } catch (error) {
      props.error(error.response.data.error, 30)
    }
  }

  const deletePost = () => {
    try {
      props.history.push("/")
      props.deletePost(post)
      props.delete_notification(post.title, 20)
    } catch (error) {
      console.log(error)
    }
  }

  if (props.post === undefined) {
    return null
  }

  return (
    <div>
      <h3>Author: {post.title}</h3>
      <p>Author: {post.author}</p>
      <a href={post.url} rel="noopener noreferrer" target="_blank">
        Read more
      </a>
      <p>
        Likes: {post.likes}
        <button value={post.id} onClick={giveLike}>
          Like
        </button>
      </p>
      <p>Created by: {post.user.username} </p>
      {user !== null ? <DelButton post={post} deletePost={deletePost} /> : null}
      <br></br>
      <Comments postId={post.id}/>
    </div>
  )
}

const DelButton = (props) => {
  return (
    <button value={props.post.id} onClick={props.deletePost}>
      remove
    </button>
  )
}

const postStyle = {
  padding: 5,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5
}

const Post = withRouter(PostNoHistory)

const mapDispatchToProps = {
  updateLikes, deletePost, like_notification, delete_notification, error,
}

export default connect(
  null,
  mapDispatchToProps
)(Post)

