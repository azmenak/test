import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import Main from './components/Main';
import store from './store';

const entryNode = document.getElementById('entry');

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    entryNode
  );
};

render(Main);

if (module.hot) {
  window.CONFIG = CONFIG;
  module.hot.accept('./components/Main', () => {
    System.import('./components/Main').then(component => {
      render(component.default);
    });
  });
}
