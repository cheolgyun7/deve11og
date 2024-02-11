import { combineReducers, createStore } from 'redux';
import album from '../modules/album';
import board from '../modules/board';

const rootReducer = combineReducers({
  album,
  board
});

const store = createStore(rootReducer);

export default store;
