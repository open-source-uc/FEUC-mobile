/* eslint class-methods-use-this: 0, no-console: 0 */

import { PropTypes, Component } from "react";
import OneSignal from "react-native-onesignal";
import DeviceInfo from "react-native-device-info";
import { connect } from "react-redux";
import noop from "lodash/noop";
import get from "lodash/get";

import { receiveNotification, setEnabled } from "./redux/modules/notifications";
import { register } from "./redux/modules/session";

const mapStateToProps = null;

const mapDispatchToProps = {
  receiveNotification,
  setEnabled,
  register,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Notifications extends Component {
  static propTypes = {
    children: PropTypes.node,
    register: PropTypes.func,
    receiveNotification: PropTypes.func,
    setEnabled: PropTypes.func,
  };

  static defaultProps = {
    children: null,
    register: noop,
    receiveNotification: noop,
    setEnabled: noop,
  };

  componentWillMount = () => {
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("registered", this.onRegistered);
    OneSignal.addEventListener("ids", this.register);
  };

  componentDidMount() {
    this.register();
  }

  componentWillUnmount = () => {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("registered", this.onRegistered);
    OneSignal.removeEventListener("ids", this.register);
  };

  onReceived = notification => {
    this.props.receiveNotification(notification);
  };

  onOpened(openResult) {
    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);
    const id = get(openResult, "notification.payload.notificationID");
    console.log("Open:", id);
  }

  onRegistered(notifData) {
    this.props.setEnabled(true);
    console.log(
      "Device had been registered for push notifications!",
      notifData
    );
  }

  register = (device = {}) => {
    const data = {
      userId: device.userId,
      uid: DeviceInfo.getUniqueID(), // e.g. FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9
      manufacturer: DeviceInfo.getManufacturer(), // e.g. Apple
      brand: DeviceInfo.getBrand(), // e.g. Apple / htc / Xiaomi
      model: DeviceInfo.getModel(), // e.g. iPhone 6
      deviceId: DeviceInfo.getDeviceId(), // e.g. iPhone7,2 / or the board on Android e.g. goldfish
      OS: DeviceInfo.getSystemName(), // e.g. iPhone OS
      system: DeviceInfo.getSystemVersion(), // e.g. 9.0
      // : DeviceInfo.getBundleId(),  // e.g. com.learnium.mobile
      buildNumber: DeviceInfo.getBuildNumber(), // e.g. 89
      version: DeviceInfo.getVersion(), // e.g. 1.1.0
      // : DeviceInfo.getReadableVersion(),  // e.g. 1.1.0.89
      name: DeviceInfo.getDeviceName(), // e.g. Becca's iPhone 6
      agent: DeviceInfo.getUserAgent(), // e.g. Dalvik/2.1.0 (Linux; Android 5.1)
      locale: DeviceInfo.getDeviceLocale(), // e.g en-US
      country: DeviceInfo.getDeviceCountry(), // e.g US
      timezone: DeviceInfo.getTimezone(), // e.g America/Mexico_City
    };

    return this.props.register(data);
  };

  render() {
    return this.props.children;
  }
}
