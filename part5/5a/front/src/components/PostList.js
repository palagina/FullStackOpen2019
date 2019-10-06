import React from "react";
import Post from "./Post";

const PostList = ({ searchFilter, deletePost, handleLikes, user }) => {
  const postList = () =>
    searchFilter()
      .sort((a, b) => b.likes - a.likes)
      .map((post, id) => (
        <Post
          key={id}
          post={post}
          deletePost={deletePost}
          handleLikes={handleLikes}
          user={user}
        />
      ));

  return (
    <div>
      <h2>Posts</h2>
      <ol style={postListStyle}>{postList()}</ol>
    </div>
  );
}

const postListStyle = {
    color: "grey",
    paddingTop: "5px",
    fontSize: "15px",
}

export default PostList;
