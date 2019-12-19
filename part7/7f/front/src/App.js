import React, { useEffect } from "react"
import Login from "./components/Login"
import Search from "./components/Search"
import AddNew from "./components/AddNew"
import PostList from "./components/PostList"
import Togglable from "./components/Togglable"
import Logout from "./components/Logout"
import Notification from "./components/Notification"
import postService from "./services/posts"
import { useField } from "./hooks"
import { initializePosts } from "./reducers/postReducer"
import { logout, setUser } from "./reducers/loginReducer"
import { connect } from "react-redux"
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'

const App = (props) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      postService.setToken(user.token)
      props.setUser(user.username)
    }
    props.initializePosts()
      .catch(error => {
        console.log(error.message)
      })
  }, [])

  const LoggedIn = () => {
    return (
      <div>
        <Logout />
        <br></br>
        <br></br>
        <Notification />
        <Togglable buttonLabel="New Post">
          <AddNew />
        </Togglable>
        <Search />
        <PostList user={props.user}/>
      </div>
    )}

  return (
    <div>
      <Router>
        <div>
          <div>
            <Link to="/login">Login</Link>
            {props.user===null ? (
              <div>
                <Redirect to="/login" />
              </div>
            ) : (
              <em>{props.user} logged in</em>
            )}

          </div>
          <Route path="/" render={() => <h2>Blog posts</h2>} />
          <Route exact path="/posts" render={() => <LoggedIn />} />
          <Route path="/login" render={() =>  <Login />}/>
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.login,
  }
}

const mapDispatchToProps = {
  initializePosts, logout, setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
