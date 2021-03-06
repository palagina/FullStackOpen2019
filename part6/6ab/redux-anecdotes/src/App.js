import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification store={props.store} />
      <br/>
      <AnecdoteForm store={props.store} />
      <br/>
      <Filter store={props.store} />
      <AnecdoteList store={props.store} />
    </div>
  )
}

export default App