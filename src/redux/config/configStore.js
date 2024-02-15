import { combineReducers, createStore } from 'redux';
import list from '../modules/list';
import board from '../modules/board';
import user from '../modules/user';
import comment from '../modules/comment';

const rootReducer = combineReducers({
  list,
  board,
  user,
  comment
});

const store = createStore(rootReducer);

export default store;
