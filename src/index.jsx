import { Provider } from 'react-redux';
import { render } from 'react-dom';
import React from 'react';

import createStore from './store/store';
import App from './components/App';

const store = createStore();

render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('app')
);