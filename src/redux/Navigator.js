import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
// import noop from 'lodash/noop';

import Navigator from '../navigation/Navigator';


@connect(state => ({ nav: state.nav }))
export default class ConnectedNavigator extends Component {
  render() {
    const navigation = this.props.nav && addNavigationHelpers({ // eslint-disable-line
      dispatch: this.props.dispatch, // eslint-disable-line
      state: this.props.nav, // eslint-disable-line
    });
    return (
      <Navigator navigation={navigation} />
    );
  }
}
