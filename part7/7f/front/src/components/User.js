import React from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, Link} from 'react-router-dom'

const User = props => {
  if (props.user === undefined) {
    return null
  }
  return (
    <div>
      <h2>{props.user.username}</h2>
      <h3>Added blogs</h3>
      <ul>
        {props.user.posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default connect(null, null)(User)