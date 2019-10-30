import React from "react"

const AddNew = ({ handleData, title, author, url }) => {
  return (
    <div>
      <h3>Create new post</h3>
      <form onSubmit={handleData} id="addForm">
        <div>
          Title: <input {...title} />
        </div>
        <div>
          Author:  <input {...author} />
        </div>
        <div>
          URL: <input {...url} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default AddNew