import React from "react"
import { connect } from "react-redux"
import { error } from "../reducers/errorReducer"
import { setUser } from "../reducers/loginReducer"
import loginService from "../services/login"
import { useField } from "../hooks"
import { withRouter } from "react-router-dom"
import Notification from "./Notification"
import { Form, Button, Container, Input } from 'semantic-ui-react'

let LoginNoHistory = props => {

  const onSubmit = async event => {
    event.preventDefault()
    try {
      const credentials = { username: username.value, password: password.value }
      const user = await loginService.login(credentials)
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      props.history.push("/")
      props.setUser(user.username)
    } catch (error) {
      props.error(error.response.data.error, 30)
    }
  }
  const username = useField("text")
  const password = useField("text")

  return (
    <Container>
      <Container>Login: user, Password: password</Container>
      <Notification />
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input focus placeholder='Enter username' {...username} />
        </Form.Field>
        <Form.Field>
          <Input focus placeholder='Enter password' {...password} />
        </Form.Field>
        <Button type='submit' color="violet">Login</Button>
      </Form>
    </Container>
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
