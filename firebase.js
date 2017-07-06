import { eventChannel } from 'redux-saga';
import { call, put, take, cancelled } from 'redux-saga/effects';
import Firebase from 'firebase';

let firebaseInstance;

function getInstance() {
  if (!firebaseInstance) {
    firebaseInstance = Firebase.initializeApp(CONFIG.firebase);
    if (process.env.NODE_ENV === 'development') {
      window.firebaseApp = firebaseInstance;
      Firebase.database.enableLogging(true);
    }
  }
  return firebaseInstance;
}

export function database(path = '') {
  const app = getInstance();
  return app.database().ref(`/${process.env.NODE_ENV}/${path}`);
}

export const firebaseEmitter = (key, ref) => eventChannel(emitter => {
  const cb = (snapshot, prevKey) => {
    emitter({
      val: snapshot.val(),
      key: snapshot.key,
      prevKey,
    });
  };
  ref.on(key, cb);
  return () => {
    ref.off(key, cb);
  };
});

export function* firebaseSync(key, ref, action, options = {}) {
  const {
    closeAction,
    loadAction,
  } = options;

  if (loadAction) {
    const snapshot = yield ref.once('value');
    yield put(loadAction(snapshot.val(), snapshot.key));
  }

  const syncChannel = yield call(firebaseEmitter, key, ref);
  try {
    while (true) {
      const { val } = yield take(syncChannel);
      if (typeof action === 'string') {
        yield put({ type: action, data: val });
      } else {
        yield put(action(val));
      }
    }
  } finally {
    if (yield cancelled()) {
      syncChannel.close();
      if (closeAction) {
        yield put(closeAction());
      }
    }
  }
}

export const valueSync = firebaseSync.bind(null, 'value');
export const childAddedSync = firebaseSync.bind(null, 'child_added');
export const childRemovedSync = firebaseSync.bind(null, 'child_removed');
export const childChangedSync = firebaseSync.bind(null, 'child_changed');
export const childMovedSync = firebaseSync.bind(null, 'child_moved');

export const valueEmitter = firebaseEmitter.bind(null, 'value');
export const childAddedEmitter = firebaseEmitter.bind(null, 'child_added');
export const childRemovedEmitter = firebaseEmitter.bind(null, 'child_removed');
export const childChangedEmitter = firebaseEmitter.bind(null, 'child_changed');
export const childMovedEmitter = firebaseEmitter.bind(null, 'child_moved');
