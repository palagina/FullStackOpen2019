import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import postReducer from "./reducers/postReducer"
import filterReducer from "./reducers/filterReducer"
import notificationReducer from "./reducers/notificationReducer"
import errorReducer from "./reducers/errorReducer"

const reducer = combineReducers({
  posts: postReducer,
  filter: filterReducer,
  notification: notificationReducer,
  error: errorReducer,
})

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store