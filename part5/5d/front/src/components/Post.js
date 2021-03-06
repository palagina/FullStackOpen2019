import React, { useState } from "react";

const Post = ({ post, deletePost, user, handleLikes }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };

  const DelButton = () => {
    return (
      <button value={post.id} onClick={deletePost}>
        remove
      </button>
    )
  }

  const LikeButton = () => {
    return (
      <button value={post.id} onClick={handleLikes}>
        Like
      </button>
    )
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const PostInfo = () => {
    return (
      <div style={showWhenVisible} className="postInfo">
        <a href={post.url} rel="noopener noreferrer" target="_blank">Read more</a>
        <p>Likes: {post.likes} <LikeButton/> </p>
        <p>Created by: {post.user.username} </p>
        {user !== null ? <DelButton/> : null}
      </div>
    )
  }

  return (
    <li style={postStyle} className="postDiv" >
      <div onClick={toggleVisibility} >
        <p>{post.title} </p>
        <p>Author: {post.author}</p>
      </div>
      <PostInfo />
    </li>
  )
}

const postStyle = {
  padding: 5,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5
}

export default Post
