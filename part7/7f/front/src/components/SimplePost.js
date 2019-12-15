import React from "react"

const SimplePost = ({ post, onClick }) => (
  <div className="simplePost">
    <div>
      {post.title} {post.author}
    </div>
    <div>
      post has {post.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimplePost