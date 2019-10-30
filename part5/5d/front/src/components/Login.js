import React from "react"
import PropTypes from "prop-types"

const Login = ({
  username,
  password,
  handleLogin
}) => {
  return (
    <form onSubmit={handleLogin} className="loginForm">
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
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default Login