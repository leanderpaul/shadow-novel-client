/**
 * Importing npm packages.
 */
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Importing user defined components.
 */
import App from './containers/app/App';

/**
 * Importing global css.
 */
import './assets/css/grid.css';
import './assets/css/utility.css';

/**
 * Rendering the app.
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
