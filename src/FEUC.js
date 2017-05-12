"use strict";

import React from "react";
import { AsyncStorage } from "react-native";
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import Config from "react-native-config";
import moment from "moment";

import App from "./App";
import Client from "./api-client/Client";
import configureStore from "./redux/store";

// Moment.js I18n
moment.updateLocale("es", require("moment/locale/es"));

// HTTP Client
const client = new Client(Config.FEUC_API_URL || "http://localhost:3000");

// Google Analytics tracker
const tracker = new GoogleAnalyticsTracker(Config.GOOGLE_ANALYTICS_ID);

// Redux required objects
const initialState = {};
const store = configureStore(initialState, { client, tracker });

// App general settings
const options = {
  hydratation: {
    storage: AsyncStorage,
    blacklist: ["hydratation", "nav"],
  },
};

// Composed and complete app
const FEUC = () => <App store={store} options={options} />;

export default FEUC;
