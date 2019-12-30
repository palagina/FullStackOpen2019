import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Logout from "./Logout"

const NavBar = props => {
  return (
    <div style={style}>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <p>{props.user} logged in </p>
      <Logout />
    </div>
  )
}

const style = {
    display: "inline"
  }

export default connect(null, null)(NavBar)