import { combineReducers, createStore } from 'redux';
import album from '../modules/album';

const rootReducer = combineReducers({
  album
});

const store = createStore(rootReducer);

export default store;
