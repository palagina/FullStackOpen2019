import React from "react"
import { connect } from "react-redux"
import Logout from "./Logout"

const Users = props => {
  return (
    <div>
      <h2>Blog posts</h2>
      <div>{props.user} logged in</div>
      <Logout />
      <br></br>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>No of posts</th>
          </tr>
          {props.users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.posts.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    users: state.users,
  }
}

export default connect(mapStateToProps, null)(Users)