/* eslint class-methods-use-this: 0, no-console: 0 */

import React, { PropTypes, Component } from 'react';
import { Provider, connect } from 'react-redux';
import noop from 'lodash/noop';

import Navigator from './redux/Navigator';
import I18n from './I18n';
import Notifications from './Notifications';

import * as hydratation from './redux/modules/hydratation';


const mapStateToProps = state => ({
  hydratation: state.hydratation,
  nav: state.nav,
});

const mapDispatchToProps = ({
  hydrate: hydratation.hydrate,
});

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component { // eslint-disable-line
  static propTypes = {
    store: PropTypes.object.isRequired,
    hydratation: PropTypes.object.isRequired,
    hydrate: PropTypes.func.isRequired,
    options: PropTypes.object,
  }

  static defaultProps = {
    hydrate: noop,
    options: {},
  }

  componentWillMount = () => {
    const { store, hydrate, options } = this.props;

    hydrate(store, options.hydratation);
  }

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
