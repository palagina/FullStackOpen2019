import React from "react";
import { connect } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { newAnec_notify, empty } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = (props) => {
  const addAnecdote = async(event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.addNew(anecdote)
    props.addNew(newAnecdote)
    // props.newAnec_notify(content)
    // setTimeout(() => props.empty(), 5000);
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