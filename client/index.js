import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesIndex from './page/index.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RoutesIndex />
        </Router>
    </Provider>,
    document.getElementById('root')
);
