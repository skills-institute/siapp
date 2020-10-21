import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
// import ReduxJSONAPI from 'redux-json-api';
import users from './userReducer';
// import localData from './localDataReducer';

const reducer = combineReducers({
  users,
  // localData,
  api,
});


// export default combineReducers({
//   users,
// });

export default rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return reducer(state, action);
};
