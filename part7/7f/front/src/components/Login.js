import React from "react"
import { connect } from "react-redux"
import { error } from "../reducers/errorReducer"
import { setUser } from "../reducers/loginReducer"
import loginService from "../services/login"
import { useField } from "../hooks"
import { withRouter } from "react-router-dom"
import Notification from "./Notification"

let LoginNoHistory = props => {

  const onSubmit = async event => {
    event.preventDefault()
    try {
      const credentials = { username: username.value, password: password.value }
      const user = await loginService.login(credentials)
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      props.history.push("/posts")
      props.setUser(user.username)
    } catch (error) {
      props.error(error.response.data.error, 30)
    }
  }
  const username = useField("text")
  const password = useField("text")

  return (
    <div>
      <p>Login: user, Password: password</p>
      <Notification />
      <br></br>
      <form onSubmit={onSubmit} className="loginForm">
        <div>
          username:
          <input {...username} />
        </div>
        <div>
          password:
          <input {...password} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

const Login = withRouter(LoginNoHistory)

const mapDispatchToProps = {
  error, setUser
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
