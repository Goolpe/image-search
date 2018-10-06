import { combineReducers } from 'redux';
import photoReducer from './photoReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  photos: photoReducer,
  error: errorReducer
});


