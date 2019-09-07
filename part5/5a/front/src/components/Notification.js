import React from "react";

const Notification = ({ message }) => {
  if (message[0] === "success") {
    return <div style={successStyle}>{message[1]}</div>;
  } else if (message[0] === "error") {
    return <div style={errorStyle}>{message[1]}</div>;
  } else {
    return <div style={noMessage}></div>;
  }
};

const errorStyle = {
  display: "block",
  color: "red",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px"
};

const successStyle = {
  display: "block",
  color: "green",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px"
};

const noMessage = {
  display: "none",
};

export default Notification;
