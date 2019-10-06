import React, { useState, useEffect } from "react"
import Login from "./components/Login"
import Search from "./components/Search"
import AddNew from "./components/AddNew"
import PostList from "./components/PostList"
import Togglable from "./components/Togglable"
import Notification from "./components/Notification"
import postService from "./services/posts"
import loginService from "./services/login"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState([])
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState([])

  useEffect(() => {
    postService
      .getAll()
      .then(initialPosts => {
        setPosts(initialPosts)
      })
      .catch(error => {
        console.log(error.message)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      postService.setToken(user.token)
    }
  }, [])

  //Login
  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      postService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (error) {
      setMessage(["error", "Wrong credentials"])
      setTimeout(() => {
        setMessage([])
      }, 5000)
    }
  }

  const loggedIn = () => {
    return (
      <div>
        <p>{user.username} logged in</p>
        <button onClick={userLogout}>Log out</button>
        <br></br>
        <br></br>
        <Togglable buttonLabel="New Post">
          <AddNew
            handleData={handleData}
            newPost={newPost}
            handleChange={handleChange}
          />
        </Togglable>
      </div>
    )}

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Log in">
        <p>Login: user, Password: password</p>
        <Login
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </Togglable>
    )
  }

  const userLogout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedBlogAppUser", JSON.stringify(user))
  }

  //Search
  const searchFilter = () =>
    posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase())
    )
  const handleSearch = event => {
    setSearch(event.target.value)
  }

  //NewPost state change
  const handleChange = event => {
    if (event.target.name === "title") {
      const newTitle = event.target.value
      setNewPost(prevState => {
        return { ...prevState, title: newTitle }
      })
    }
    if (event.target.name === "author") {
      const newAuthor = event.target.value
      setNewPost(prevState => {
        return { ...prevState, author: newAuthor }
      })
    }
    if (event.target.name === "likes") {
      const newLikes = event.target.value
      setNewPost(prevState => {
        return { ...prevState, likes: newLikes }
      })
    }
    if (event.target.name === "url") {
      const newUrl = event.target.value
      setNewPost(prevState => {
        return { ...prevState, url: newUrl }
      })
    }
  }

  //Checks and returns already existing post or undefined
  const checkExisting = newTitle => {
    const titleMatch = posts.find(post =>
      post !== undefined ? post.title === newTitle : undefined
    )
    return titleMatch
  }

  //Add a new title
  const addPost = async postObject => {
    try {
      const returnedPost = await postService.create(postObject)
      setPosts(posts.concat(returnedPost))
      setMessage([
        "success",
        `A new post '${postObject.title}' by '${postObject.author}' was added`
      ])
      setTimeout(() => {
        setMessage([])
      }, 5000)
    } catch (error) {
      setMessage(["error", error.response.data.error])
      setTimeout(() => {
        setMessage([])
      }, 5000)
    }
  }

  //Update existing post
  const updatePost = async (postMatch, postObject) => {
    if (
      window.confirm(
        `${postMatch.title} already exists. Do you want to replace it?`
      )
    ) {
      try {
        const updatedPost = await postService.update(postMatch.id, postObject)
        setPosts(
          posts.map(post => (post.id !== postMatch.id ? post : updatedPost))
        )
        setMessage(["success", `'${postMatch.title}' was updated`])
        setTimeout(() => {
          setMessage([])
        }, 5000)
      } catch (error) {
        console.log(error.response)
        setMessage(["error", error.response.data.error])
        setTimeout(() => {
          setMessage([])
        }, 5000)
      }
    }
  }

  const updateLikes = async (postToUpdate, postObject) => {
    try {
      const updatedPost = await postService.update(postToUpdate.id, postObject)
      setPosts(
        posts.map(post => (post.id !== postToUpdate.id ? post : updatedPost))
      )
    } catch (error) {
      console.log(error.response)
      setMessage(["error", error.response.data.error])
      setTimeout(() => {
        setMessage([])
      }, 5000)
    }
  }

  //Handle add or update functionality
  const handleData = async event => {
    event.preventDefault()
    const postObject = {
      title: newPost.title,
      author: newPost.author,
      url: newPost.url,
      likes: newPost.likes
    }
    const postMatch = checkExisting(postObject.title)
    postMatch === undefined
      ? addPost(postObject)
      : updatePost(postMatch, postObject)
    setNewPost([])
  }

  const handleLikes = async event => {
    event.preventDefault()
    const postToUpdate = posts.find(post =>
      post.id === event.target.value
    )
    const postObject = {
      title: postToUpdate.title,
      author: postToUpdate.author,
      url: postToUpdate.url,
      likes: postToUpdate.likes+1
    }
    await updateLikes(postToUpdate, postObject)
    setNewPost([])
  }

  //Delete post
  const deletePost = async event => {
    event.preventDefault()
    const deletedPostTitle = event.target.title
    if (window.confirm(`Do you want to delete ${deletedPostTitle}`)) {
      try {
        await postService.remove(event.target.value)
        setPosts(posts.filter(post => post.title !== deletedPostTitle))
        setMessage(["success", `'${deletedPostTitle}' was deleted`])
        setTimeout(() => {
          setMessage([])
        }, 5000)
      } catch (error) {
        setMessage(["error", `Post '${deletedPostTitle}' was already deleted`])
        setTimeout(() => {
          setMessage([])
        }, 5000)
        setPosts(posts.filter(post => post.title !== deletedPostTitle))
      }
    }
  }

  return (
    <div>
      <h2>Blog posts</h2>
      <Notification message={message} />
      {user === null ? loginForm() : loggedIn() }
      <Search search={search} handleSearch={handleSearch} />
      <PostList
        searchFilter={searchFilter}
        deletePost={deletePost}
        user={user}
        handleLikes={handleLikes}
      />

    </div>
  )
}

export default App
