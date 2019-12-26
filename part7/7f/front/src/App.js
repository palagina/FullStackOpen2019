import React, { useEffect } from "react"
import Login from "./components/Login"
import Search from "./components/Search"
import AddNew from "./components/AddNew"
import PostList from "./components/PostList"
import Togglable from "./components/Togglable"
import Logout from "./components/Logout"
import Users from "./components/Users"
import Notification from "./components/Notification"
import postService from "./services/posts"
import { initializePosts } from "./reducers/postReducer"
import { getUsers } from "./reducers/usersReducer"
import { logout, setUser } from "./reducers/loginReducer"
import { connect } from "react-redux"
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

const App = (props) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      postService.setToken(user.token)
      props.setUser(user.username)
    }
    props.getUsers()
    props.initializePosts()
      .catch(error => {
        console.log(error.message)
      })
  }, [])

  const LoggedIn = () => {
    return (
      <div>
        <div>{props.user} logged in</div>
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
      <h2>Blog posts</h2>
      <Router>
        <div>
          <div>
            <Link to="/users">Users</Link>
            {props.user==="" ? (
              <Redirect to="/login" />
            ) : (
              <Redirect to="/" />
            )}

          </div>
          <Route exact path="/" render={() => <LoggedIn/>} />
          <Route path="/login" render={() =>  <Login />}/>
          <Route path="/users" render={() =>  <Users user={props.user}/>}/>
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
  initializePosts, logout, setUser, getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
