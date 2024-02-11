import { combineReducers, createStore } from 'redux';
import album from '../modules/album';
import board from '../modules/board';
import user from '../modules/user';

const rootReducer = combineReducers({
  album,
  board,
  user
});

const store = createStore(rootReducer);

export default store;
