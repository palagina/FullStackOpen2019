import React from 'react';
import { vote } from '../reducers/anecdoteReducer'
import { notification, empty } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = ({ store }) => {
const { anecdotes, filter } = store.getState()

const anecdotesToShow = () => {
  if(filter !== undefined){
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    return filteredAnecdotes
  }
  else {
    return anecdotes
  }
}

    return (
      <ul>
        {anecdotesToShow().map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() =>{
              store.dispatch(vote(anecdote.id))
              store.dispatch(notification(anecdote))
              setTimeout(() => store.dispatch(empty()), 5000);
            }
            }
          />
        )}
      </ul>
    )
  }

export default AnecdoteList