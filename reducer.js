import { fromJS } from 'immutable';
import { createReducer } from 'redux-immutablejs';

import * as actions from './actions';

const initialState = fromJS({
  connections: {},
  lastConnection: null,
  ownConnectionKey: null,
  ip: null,
  fetchIpError: null,
});

export default createReducer(initialState, {
  [actions.CONNECTION_ADDED]: (state, { data, key }) => state.setIn(['connections', key], data),
  [actions.CONNECTION_REMOVED]: (state, { key }) => state.deleteIn(['connections', key]),

  [actions.LAST_CONNECTION_VALUE]: (state, { data }) => state.set('lastConnection', data),

  [actions.SET_OWN_IP]: (state, { ip }) => state.set('ip', ip),
  [actions.SET_OWN_CONNECTION_KEY]: (state, { key }) => state.set('ownConnectionKey', key),

  [actions.FETCH_IP_ERROR]: (state, { error }) => state.set('fetchIpError', error),
});
