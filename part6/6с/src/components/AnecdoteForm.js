import React from "react";
import { connect } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { newAnec_notify} from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const addAnecdote = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addNew(content)
    props.newAnec_notify(content, 50)
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
  { addNew, newAnec_notify }
)(NewAnecdote)