import React from "react";
import { connect } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { newAnec_notify, empty } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.addNew(content)
    props.newAnec_notify(content)
    setTimeout(() => props.empty(), 5000);
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add new</button>
    </form>
  );
};

export default connect(
  null,
  { addNew, newAnec_notify, empty }
)(NewAnecdote)