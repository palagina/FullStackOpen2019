import React from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

const Users = props => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>No of posts</th>
          </tr>
          {props.users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.posts.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

export default connect(mapStateToProps, null)(Users)