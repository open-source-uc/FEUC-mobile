/* eslint class-methods-use-this: 0 */

import React, { Component } from "react";
import { BackAndroid } from "react-native";
import PropTypes from "prop-types";
import { Provider, connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import KeepAwake from "react-native-keep-awake";
import noop from "lodash/noop";
import get from "lodash/get";

import Navigator from "./redux/Navigator";
import I18n from "./I18n";
import Notifications from "./Notifications";

import * as hydratation from "./redux/modules/hydratation";

const mapStateToProps = state => ({
  hydratation: state.hydratation,
  nav: state.nav,
});

const mapDispatchToProps = {
  hydrate: hydratation.hydrate,
  back: NavigationActions.back,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    hydratation: PropTypes.object.isRequired,
    hydrate: PropTypes.func.isRequired,
    back: PropTypes.func.isRequired,
    options: PropTypes.object,
  };

  static defaultProps = {
    hydrate: noop,
    back: noop,
    options: {},
  };

  componentWillMount = () => {
    const { store, hydrate, options } = this.props;

    hydrate(store, options.hydratation);
  };

  componentDidMount() {
    if (process.env.NODE_ENV === "development") {
      KeepAwake.activate();
    }
    BackAndroid.addEventListener("backPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener("backPress", this.handleBackButton);
  }

  handleBackButton = () => {
    if (get(this.props, "nav.routes.length", 0) <= 1) {
      return BackAndroid.exitApp();
    } else {
      return this.props.back();
    }
  };

  render() {
    if (this.props.hydratation && this.props.hydratation.done) {
      return (
        <Provider store={this.props.store}>
          <I18n>
            <Notifications>
              <Navigator />
            </Notifications>
          </I18n>
        </Provider>
      );
    } else {
      return null;
    }
  }
}
