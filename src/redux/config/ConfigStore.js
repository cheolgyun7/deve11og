import { combineReducers, createStore } from 'redux';
import album from '../modules/album';
import user from '../modules/user';

const rootReducer = combineReducers({
  album,
  user
});

const store = createStore(rootReducer);

export default store;
