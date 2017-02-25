'use strict';

import React from 'react';
import { AsyncStorage } from 'react-native';
import Config from 'react-native-config';

import App from './App';
import Client from './api-client/Client';
import configureStore from './redux/store';


// HTTP Client
const client = new Client(Config.FEUC_API_URL || 'http://localhost:3000');

// Redux required objects
const initialState = {};
const store = configureStore(initialState, { client });

// App general settings
const options = {
  hydratation: {
    storage: AsyncStorage,
    blacklist: ['hydratation', 'navigation'],
  },
};

// Composed and complete app
const FEUC = () => (
  <App store={store} options={options} />
);

export default FEUC;
