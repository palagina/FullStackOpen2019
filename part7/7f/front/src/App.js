import React, { useEffect } from "react"
import Login from "./components/Login"
import Search from "./components/Search"
import AddNew from "./components/AddNew"
import PostList from "./components/PostList"
import Togglable from "./components/Togglable"
import Logout from "./components/Logout"
import Users from "./components/Users"
import User from "./components/User"
import Post from "./components/Post"
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
        <Notification />
        <Togglable buttonLabel="New Post">
          <AddNew />
        </Togglable>
        <Search />
        <PostList user={props.user}/>
      </div>
    )}

  const userById = id => {
    return props.users.find(user => user.id === id)
  }

  const postById = id => {
    return props.posts.find(post => post.id === id)
  }

  return (
    <div>
      <Router>
        <div>
          <div>
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
            {props.user==="" ? (
              <Redirect to="/login" />
            ) : (
              <Redirect to="/" />
            )}
            <h2>Blog posts</h2>
            <div>{props.user} logged in</div>
            <Logout />
            <br></br>
            <br></br>
          </div>
          <Route exact path="/" render={() => <LoggedIn/>} />
          <Route exact path="/login" render={() =>  <Login />}/>
          <Route path="/users" render={() =>  <Users user={props.user}/>}/>
          <Route path="/users/:id" render={({ match }) => <User user={userById(match.params.id)}/>} />
          <Route path="/posts/:id" render={({ match }) => <Post post={postById(match.params.id)}/>} />
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.login,
    users: state.users,
    posts: state.posts,
  }
}

const mapDispatchToProps = {
  initializePosts, logout, setUser, getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
