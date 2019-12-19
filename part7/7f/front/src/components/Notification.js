import React from "react"
import { connect } from "react-redux"

const Notification = (props) => {

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    width: "300px"
  }

  if (props.error !== "") {
    return <div style={style}>{props.error}</div>
  } else {
    return <div style={style}>{props.notification}</div>
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    error: state.error,
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)
export default ConnectedNotifications

