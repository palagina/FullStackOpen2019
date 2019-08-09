import React from "react";

const Search = ({ search, handleSearch }) => {

  return (
    <div>
     <form>
        <input placeholder="Search.." value={search} onChange={handleSearch}/>
      </form>
    </div>
  )
}

export default Search