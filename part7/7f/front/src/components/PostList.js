import React from "react"
import Post from "./Post"
import { connect } from "react-redux";

const PostList = props => {

  return (
    <ul style={postListStyle} className="postList">
      {props.visiblePosts.map(post => (
        <Post
          key={post.id}
          post={post}
          user={props.user}
        />
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
