/* eslint class-methods-use-this: 0, no-console: 0 */

import React, { Component } from 'react';
// import OneSignal from 'react-native-onesignal';

import Navigator from './Navigator';


export default class App extends Component {
  componentWillMount = () => {
    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('registered', this.onRegistered);
    // OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount = () => {
    // OneSignal.removeEventListener('received', this.onReceived);
    // OneSignal.removeEventListener('opened', this.onOpened);
    // OneSignal.removeEventListener('registered', this.onRegistered);
    // OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = (notification) => {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onRegistered(notifData) {
    console.log('Device had been registered for push notifications!', notifData);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return (
      <Navigator />
    );
  }
}
