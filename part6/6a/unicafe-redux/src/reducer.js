const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GOOD':
        return {...state, good: state.good + 1 }
      case 'OK':
        return {...state, ok: state.ok + 1 }
      case 'BAD':
        return {...state, bad: state.bad + 1 }
      case 'ZERO':
          const zero = 0;
        return {...state, good: zero, ok: zero, bad: zero }
      default: 
        return state
    }
  }
  
  export default counterReducer