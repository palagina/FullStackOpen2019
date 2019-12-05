import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => b.votes - a.votes)
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes+1
      }
      const mappedList = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    return mappedList.sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const updatedVote = await anecdoteService.vote(anecdote)
    dispatch({
      type: "VOTE",
      data: updatedVote
    });
  };
};

export const addNew = (content) => { 
  return async dispatch => {
    const newAnecdote = await anecdoteService.addNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    })
  }
}

export default anecdoteReducer