import React from "react";
import { addNew } from '../reducers/anecdoteReducer'

const NewAnecdote = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.store.dispatch(
      addNew(content)
    )
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add new</button>
    </form>
  );
};

export default NewAnecdote;
