import React from 'react'

const Post = ({post, deletePost, user}) => {

const DelButton = user => {
  return (
    <button title={post.title} value={post.id} onClick={deletePost}>
      del
    </button>
  );
};

return (
  <li>
    {post.title} {post.author} <a href={post.url}>link</a> {post.likes}
    {(user!==null) ? (<DelButton user={user} />) : null}
  </li>
);
}

export default Post