import 'antd/dist/antd.css';
import './styles/App.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home/Home';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
