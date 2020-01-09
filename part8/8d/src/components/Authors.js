import React, { useState } from 'react'
import YearForm from './YearForm'

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  if (props.result.loading) {
    return <div>loading...</div>
  }
  const authors = props.result.data.allAuthors 
  const editYear = props.editYear

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br></br>
      <YearForm editYear={editYear} authors={authors} />

    </div>
  )
}

export default Authors