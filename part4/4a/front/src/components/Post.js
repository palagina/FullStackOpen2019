import React from 'react'

const Post = ({post, deletePost}) => {
  return (
    <li>
    {post.title} {post.author} {post.url} {post.likes} 
    <button title={post.title} value={post.id} onClick={deletePost}>del</button>
    </li>
  )
}

export default Post