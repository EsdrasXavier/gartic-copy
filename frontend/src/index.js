import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/App.scss';

localStorage.setItem("user", '{}');

ReactDOM.render(<App />,
  document.getElementById('root')
);

serviceWorker.unregister();
