import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import AddNew from "./components/AddNew";
import PostList from "./components/PostList";
import postService from "./services/posts";
import Notification from "./components/Notification";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState([]);

  useEffect(() => {
    postService
      .getAll()
      .then(initialPosts => {
        setPosts(initialPosts);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  //Search
  const searchFilter = () =>
    posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  const handleSearch = event => {
    setSearch(event.target.value);
  };

  //NewPost state change
  const handleChange = event => {
    if(event.target.name === "title") {
      const newTitle = event.target.value
      setNewPost(prevState => {
        return { ...prevState, title: newTitle };
      });  
    }
    if(event.target.name === "author") {
      const newAuthor = event.target.value
      setNewPost(prevState => {
        return { ...prevState, author: newAuthor };
      });
    }
    if(event.target.name === "likes") {
      const newLikes = event.target.value
      setNewPost(prevState => {
        return { ...prevState, likes: newLikes };
      });
    }
    if(event.target.name === "url") {
      const newUrl = event.target.value
      setNewPost(prevState => {
        return { ...prevState, url: newUrl };
      });
    }
  };

  //Checks and returns already existing post or undefined
  const checkExisting = newTitle => {
    const titleMatch = posts.find(post => post!==undefined ? (post.title === newTitle) : undefined)
    return titleMatch;
  };

  //Add a new title
  const addPost = postObject => {
    postService
      .create(postObject)
      .then(returnedPost => {
        setPosts(posts.concat(returnedPost));
        setMessage(["success", `'${postObject.title}' was added`]);
        setTimeout(() => {
          setMessage([]);
        }, 5000);
      })
      .catch(error => {
        setMessage(["error", error.response.data.error]);
        setTimeout(() => {
          setMessage([]);
        }, 5000);
      });
  };

  //Update existing post
  const updatePost = (postMatch, postObject) => {
    if (window.confirm(`${postMatch.title} is already added to phonebook. Do you want to replace it?`)) {
      postService
        .update(postMatch.id, postObject)
        .then(updatedPost => {
          setPosts(
            posts.map(post => (post.id !== postMatch.id ? post : updatedPost))
          );
          setMessage(["success", `'${postMatch.title}' was updated`]);
          setTimeout(() => {
            setMessage([]);
          }, 5000);
        })
        .catch(error => {
          console.log(error.response);
          setMessage(["error", error.response.data.error]);
          setTimeout(() => {
            setMessage([]);
          }, 5000);
        });
    }
  };

  //Handle add or update functionality
  const handleData = async(event) => {
    event.preventDefault();
    const postObject = {
      title: newPost.title,
      author: newPost.author,
      url: newPost.url,
      likes: newPost.likes
    };
    const postMatch = checkExisting(postObject.title);
    postMatch === undefined
      ? addPost(postObject)
      : updatePost(postMatch, postObject);
      setNewPost([])
  };

  //Delete post
  const deletePost = event => {
    event.preventDefault();
    const deletedPostTitle = event.target.title;
    if (window.confirm(`Do you want to delete ${deletedPostTitle}`)) {
      postService
        .remove(event.target.value)
        .then(() => {
          setPosts(posts.filter(post => post.title !== deletedPostTitle));
          setMessage(["success", `'${deletedPostTitle}' was deleted`]);
          setTimeout(() => {
            setMessage([]);
          }, 5000);
        })
        .catch(error => {
          console.log(error);
          setMessage([
            "error",
            `Post '${deletedPostTitle}' was already deleted`
          ]);
          setTimeout(() => {
            setMessage([]);
          }, 5000);
          setPosts(posts.filter(post => post.title !== deletedPostTitle));
        });
    }
  };

  return (
    <div>
      <h2>Blog posts</h2>
      <Notification message={message} />
      <Search search={search} handleSearch={handleSearch} />
      <AddNew
        handleData={handleData}
        newPost={newPost}
        handleChange={handleChange}
      />
      <PostList
        searchFilter={searchFilter}
        deletePost={deletePost}
        updatePost={updatePost}
      />
    </div>
  );
};

export default App;
