import React, { Component } from 'react';

import { Home, Community, Events } from './screens/';

const setup = {
  panHandlers: null,
  duration: 0,
  hideNavBar: true,
  hideTabBar: true,
};

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" tabs hideNavBar hideTabBar>
          <Scene title="Home" key="home" component={Home} {...setup} />
          <Scene title="Community" key="community" component={Community} {...setup} />
          <Scene title="Events" key="events" component={Events} {...setup} />
        </Scene>
      </Router>
    );
  }
}
