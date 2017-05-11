/* eslint class-methods-use-this: 0, no-console: 0 */

import { PureComponent } from "react";
import { Platform, PushNotificationIOS } from "react-native";
import PropTypes from "prop-types";
import OneSignal from "react-native-onesignal";
import DeviceInfo from "react-native-device-info";
import { connect } from "react-redux";
import { denormalize } from "normalizr";
import noop from "lodash/noop";

import { notificationOpen } from "./redux/modules/notifications";
import { register } from "./redux/modules/session";
import * as schemas from "./schemas";

const mapStateToProps = state => ({
  notifications: state.notifications,
  entities: state.entities,
});

const mapDispatchToProps = {
  notificationOpen,
  register,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Notifications extends PureComponent {
  static propTypes = {
    notifications: PropTypes.object,
    entities: PropTypes.object,

    children: PropTypes.node,
    register: PropTypes.func,
    notificationOpen: PropTypes.func,
  };

  static defaultProps = {
    notifications: {},
    entities: {},

    children: null,
    register: noop,
    notificationOpen: noop,
  };

  static denormalizeAndCount = ({ notifications, entities }) => {
    const schema = [schemas.notification];
    const array = denormalize(notifications.result, schema, entities);
    return array.reduce(
      (previous, current) =>
        notifications.seen[current._id] ? previous : previous + 1,
      0
    );
  };

  state = {
    unseen: this.constructor.denormalizeAndCount(this.props),
  };

  componentWillMount = () => {
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("registered", this.onRegistered);
    OneSignal.addEventListener("ids", this.register);
  };

  componentDidMount() {
    this.register();

    // See: https://github.com/geektimecoil/react-native-onesignal#set-in-app-focus-behavior
    if (Platform.OS === "android") {
      OneSignal.inFocusDisplaying(2);
    } else {
      // Done on AppDelegate.m
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entities && nextProps.notifications) {
      const unseen = this.constructor.denormalizeAndCount(nextProps);
      this.setState({
        unseen,
      });
    }
  }

  componentWillUnmount = () => {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("registered", this.onRegistered);
    OneSignal.removeEventListener("ids", this.register);
  };

  // eslint-disable-next-line
  onReceived = notification => {
    // Nothing?
  };

  onOpened = openResult => {
    this.props.notificationOpen(openResult.notification);
  };

  onRegistered(notifData) {
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
    // PushNotificationIOS.setApplicationIconBadgeNumber(this.state.unseen);
    console.log("Count", this.state.unseen);
    return this.props.children;
  }
}
