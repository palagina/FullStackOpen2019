import React, { useState } from "react"
import { connect } from "react-redux"
import { updateLikes, deletePost } from "../reducers/postReducer"
import { like_notification, delete_notification  } from "../reducers/notificationReducer"
import { error } from "../reducers/errorReducer"

const Post = (props) => {
  const { post, user } = props
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? "" : "none" }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

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
      props.deletePost(post)
      props.delete_notification(post.title, 20)
    } catch (error) {
      props.error(error.response.data.error, 30)
    }
  }

  return (
    <li style={postStyle} className="postDiv">
      <div onClick={toggleVisibility}>
        <p>{post.title} </p>
        <p>Author: {post.author}</p>
      </div>
      <div style={showWhenVisible} className="postInfo">
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
        {user !== null ? <DelButton post={post} deletePost={deletePost}/> : null}
      </div>
    </li>
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

const mapDispatchToProps = {
  updateLikes, deletePost, like_notification, delete_notification, error
}

export default connect(
  null,
  mapDispatchToProps
)(Post)

