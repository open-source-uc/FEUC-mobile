import React, { PropTypes, Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import noop from 'lodash/noop';

import Navigator from '../navigation/Navigator';


@connect(state => ({ nav: state.nav }))
export default class ConnectedNavigator extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    nav: PropTypes.any,
  }

  static defaultProps = {
    dispatch: noop,
    nav: {},
  }

  render() {
    const navigation = this.props.nav && addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });
    return (
      <Navigator navigation={navigation} />
    );
  }
}
