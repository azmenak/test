import { fromJS } from 'immutable';
import { createReducer } from 'redux-immutablejs';

const initialState = fromJS({
  connections: [],
  lastConnection: null,
});

export default createReducer(initialState, {

});
