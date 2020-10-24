import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';
import commentsReducer from './reducers/commentsReducer';

const reducer = combineReducers({
  comments: commentsReducer,
  blogs: blogsReducer,
  notification: notificationReducer,
  user: userReducer,
  users: usersReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
