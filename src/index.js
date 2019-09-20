import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Route from './router'
import * as serviceWorker from './serviceWorker';
import './config/rem'
import './style/base.less'
import {Provider} from 'react-redux'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <Route />
    </Provider>
    , document.getElementById('root')
);

serviceWorker.unregister();
