/* eslint class-methods-use-this: 0, no-console: 0 */

import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';
import DeviceInfo from 'react-native-device-info';

import Navigator from './Navigator';


export default class App extends Component {
  componentWillMount = () => {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount = () => {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
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
    const data = {
      userId: device.userId,
      uid: DeviceInfo.getUniqueID(),  // e.g. FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9
      manufacturer: DeviceInfo.getManufacturer(),  // e.g. Apple
      brand: DeviceInfo.getBrand(),  // e.g. Apple / htc / Xiaomi
      model: DeviceInfo.getModel(),  // e.g. iPhone 6
      device: DeviceInfo.getDeviceId(),  // e.g. iPhone7,2 / or the board on Android e.g. goldfish
      OS: DeviceInfo.getSystemName(),  // e.g. iPhone OS
      version: DeviceInfo.getSystemVersion(),  // e.g. 9.0
      // : DeviceInfo.getBundleId(),  // e.g. com.learnium.mobile
      // : DeviceInfo.getBuildNumber(),  // e.g. 89
      // : DeviceInfo.getVersion(),  // e.g. 1.1.0
      // : DeviceInfo.getReadableVersion(),  // e.g. 1.1.0.89
      name: DeviceInfo.getDeviceName(),  // e.g. Becca's iPhone 6
      agent: DeviceInfo.getUserAgent(), // e.g. Dalvik/2.1.0 (Linux; Android 5.1)
      localte: DeviceInfo.getDeviceLocale(), // e.g en-US
      country: DeviceInfo.getDeviceCountry(), // e.g US
      timezone: DeviceInfo.getTimezone(), // e.g America/Mexico_City
    };
    console.log(data);
  }

  render() {
    return (
      <Navigator />
    );
  }
}
