import { fork, call, take, cancelled, put } from 'redux-saga/effects';
import axios from 'axios';

import { database, childAddedSync, childRemovedSync, firebaseEmitter, valueSync } from './firebase';
import * as actions from './actions';

function* fetchIp() {
  try {
    const { data } = yield call(axios.get, '//ipapi.co/json');
    yield put(actions.setOwnIp(data.ip));
    return data.ip;
  } catch (error) {
    yield put(actions.fetchIpError(error));
    throw error;
  }
}

function* watchConnections() {
  const ref = database('connections');
  yield fork(childAddedSync, ref, actions.CONNECTION_ADDED);
  yield fork(childRemovedSync, ref, actions.CONNECTION_REMOVED);
}

function* watchLastConnection() {
  const ref = database('lastConnection');
  yield fork(valueSync, ref, actions.LAST_CONNECTION_VALUE);
}

function* addOwnConnection() {
  const onlineRef = database('.info/connected');
  const connectionsRef = database('connections');
  const lastConnectionRef = database('lastConnection');

  let ownConnectionRef;

  const onlineSyncChannel = yield call(firebaseEmitter, 'value', onlineRef);
  try {
    while (true) {
      const { val } = yield take(onlineSyncChannel);
      if (val) {
        if (ownConnectionRef) {
          ownConnectionRef.remove();
        }
        const ip = yield call(fetchIp);
        ownConnectionRef = connectionsRef.push(ip);
        yield put(actions.setOwnConnectionKey(ownConnectionRef.key));
        ownConnectionRef.onDisconnect().remove();
        lastConnectionRef.set(ip);
      }
    }
  } finally {
    if (yield cancelled()) {
      onlineSyncChannel.close();
      if (ownConnectionRef) {
        ownConnectionRef.remove();
      }
    }
  }
}

export default function* sagas() {
  yield fork(watchConnections);
  yield fork(watchLastConnection);
  yield fork(addOwnConnection);
}
