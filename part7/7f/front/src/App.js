import React, { useState, useEffect } from "react"
import Login from "./components/Login"
import Search from "./components/Search"
import AddNew from "./components/AddNew"
import PostList from "./components/PostList"
import Togglable from "./components/Togglable"
import Notification from "./components/Notification"
import postService from "./services/posts"
import loginService from "./services/login"
import  { useField } from "./hooks"
import { initializePosts } from "./reducers/postReducer"
import { connect } from "react-redux"

const App = (props) => {
  const [user, setUser] = useState(null)
  const username = useField("text")
  const password = useField("text")

  useEffect(() => {
    props.initializePosts()
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
      const user = await loginService.login({ username: username.value, password: password.value })
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      postService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (error) {
      // setMessage(["error", "Wrong credentials"])
      // setTimeout(() => {
      //   setMessage([])
      // }, 5000)
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
          <AddNew />
        </Togglable>
        <Search />
        <PostList user={user}/>
      </div>
    )}

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Log in">
        <p>Login: user, Password: password</p>
        <Login
          password={password}
          username = {username}
          handleLogin={handleLogin}
        />
      </Togglable>
    )
  }

  const userLogout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedBlogAppUser", JSON.stringify(user))
  }

  return (
    <div>
      <h2>Blog posts</h2>
      <Notification />
      {user === null ? loginForm() : loggedIn() }
    </div>
  )
}

export default connect(null, { initializePosts })(App)
