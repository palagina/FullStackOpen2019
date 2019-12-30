import React from "react"
import { connect } from "react-redux";
import { BrowserRouter as Router, Link } from 'react-router-dom'

const PostList = props => {
  return (
    <ul style={postListStyle} className="postList">
      {props.visiblePosts.map(post => (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}

const postListStyle = {
  color: "grey",
  paddingTop: "5px",
  fontSize: "15px",
}

const postsToShow = ({ posts, filter }) => {
  if (filter !== undefined) {
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(filter.toLowerCase())
    )
    return filteredPosts
  } else {
    return posts
  }
}

const mapStateToProps = (state) => {
  return {
    visiblePosts: postsToShow(state)
  }
}

export default connect(
  mapStateToProps, null
)(PostList)
