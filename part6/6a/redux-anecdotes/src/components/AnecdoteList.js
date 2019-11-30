import React from 'react';
import { vote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdoteList = ({ store }) => {
    return (
      <ul>
        {store.getState().map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() =>
              store.dispatch(vote(anecdote.id))
            }
          />
        )}
      </ul>
    )
  }

export default AnecdoteList

//.sort((a, b) => a.votes + b.votes)