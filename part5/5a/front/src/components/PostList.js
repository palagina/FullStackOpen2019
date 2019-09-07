import React from "react";
import Post from "./Post";

const PostList = ({ searchFilter, deletePost, updatePost }) => {
  const postList = () =>
    searchFilter().map((post, id) => (
      <Post key={id} post={post} deletePost={deletePost} updatePost={updatePost} />
    ));

  return (
    <div>
      <h2>Posts</h2>
      <ol style={postListStyle}>{postList()}</ol>
    </div>
  );
};

const postListStyle = {
    color: "grey",
    paddingTop: "5px",
    fontSize: "15px",
}

export default PostList;
