
const notifictionReducer = (state = '', action) => {
    switch (action.type) {
      case 'VOTE_NOTIFICATION':
          const anecdoteName = action.data
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
  
  export const vote_notification = (content, time) => {
    return async dispatch => {
      dispatch({
        type: "VOTE_NOTIFICATION",
        data: content 
      });
      setTimeout(() => dispatch({ type: 'EMPTY' }), time+"00")};
  };


  export const newAnec_notify = (anecdote, time) => {
    return async dispatch => {
      dispatch({
      type: 'NEW_ANECDOTE_NOTIFICATION',
      data: anecdote
    })
    setTimeout(() => dispatch({ type: 'EMPTY' }), time+"00")};
  };

  export default notifictionReducer