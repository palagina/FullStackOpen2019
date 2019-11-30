import React from "react";
import { addNew } from '../reducers/anecdoteReducer'
import { newAnec_notify, empty } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.store.dispatch(addNew(content))
    props.store.dispatch(newAnec_notify(content))
    setTimeout(() => props.store.dispatch(empty()), 5000);
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
