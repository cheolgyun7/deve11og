import { combineReducers, createStore } from 'redux';
import list from '../modules/list';
import board from '../modules/board';
import user from '../modules/user';

const rootReducer = combineReducers({
  list,
  board,
  user
});

const store = createStore(rootReducer);

export default store;
