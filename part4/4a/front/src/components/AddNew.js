import React from "react";

const AddNew = ({ handleData, newPost, handleChange}) => {
  return (
    <div>
     <h3>Add a new phone</h3>
     <form onSubmit={handleData}>
        <div>
          Title: <input value={newPost.title || ""} name="title" onChange={handleChange} />
        </div>
        <div>
          Author: <input value={newPost.author || ""} name="author" onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default AddNew