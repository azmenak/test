import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxSaga from 'redux-saga';

import reducer from './reducer';
import sagas from './sagas';

const reduxDevTool = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : null; // eslint-disable-line no-underscore-dangle
const sagaMiddleware = reduxSaga({});

const enhancers = [
  applyMiddleware(sagaMiddleware),
];

if (reduxDevTool) {
  enhancers.push(reduxDevTool);
}

const store = createStore(
  combineReducers({ data: reducer }),
  fromJS({}),
  compose(...enhancers)
);

let task = sagaMiddleware.run(sagas);

export default store;

if (module.hot) {
  window.store = store;

  module.hot.accept('./reducer', () => {
    System.import('./reducer').then(mod => {
      store.replaceReducer(mod.default);
    });
  });

  module.hot.accept('./sagas', () => {
    System.import('./sagas').then(mod => {
      task.cancel();
      task.done.then(() => {
        task = sagaMiddleware.run(mod.default);
      });
    });
  });
}
