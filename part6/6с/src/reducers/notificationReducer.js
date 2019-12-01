const notifictionReducer = (state = '', action) => {
    switch (action.type) {
      case 'VOTE_NOTIFICATION':
          const anecdoteName = action.data.anecdote.content
          const vote_notification = "You voted for '" + anecdoteName + "'"
        return vote_notification
      case 'EMPTY':
        return ""
      case 'NEW_ANECDOTE_NOTIFICATION':
          const new_name = "You created new anecdote '" + action.data.anecdote + "'"
        return new_name
      default:
        return state
    }
  }
  
  export const notification = (anecdote) => {
    return {
      type: 'VOTE_NOTIFICATION',
      data: { anecdote }
    }
  }
  export const empty = () => {
    return {
      type: 'EMPTY',
    }
  }
  export const newAnec_notify = (anecdote) => {
    return {
      type: 'NEW_ANECDOTE_NOTIFICATION',
      data: { anecdote }
    }
  }

  export default notifictionReducer