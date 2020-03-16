import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './Routes.js';
import './App.css';

const dotenv = require('dotenv');
dotenv.config();

const browserHistory = createBrowserHistory();

if (
  !process.env.REACT_APP_RASAENDPOINT
) {
  console.log('Please check environment file.');
}

export default class App extends Component {
  render() {
    return (
        <Router history={browserHistory}>
          <Routes/>
        </Router>
    );
  }
}
