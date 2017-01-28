import React, { PropTypes, PureComponent } from 'react';
import {
  FooterTab,
  Badge,
  Button,
  Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

const TABS = [{
  name: 'Home',
  icon: 'home',
  scene: 'home',
}, {
  name: 'Community',
  icon: 'people',
  scene: 'community',
}, {
  name: 'Maps',
  icon: 'map',
  scene: 'events',
}];

export default class TabBar extends PureComponent {
  static propTypes = {
    tabs: PropTypes.array,
    selected: PropTypes.string,
    badges: PropTypes.any,
  }

  static defaultProps = {
    tabs: TABS,
    selected: null,
    badges: {},
  }

  onPress = (tab) => {
    Actions[tab.scene]();
  }

  render() {
    const { tabs, selected, badges, ...props } = this.props;

    return (
      <FooterTab {...props}>
        {tabs.map((tab, index) => {
          const active = (selected && selected === tab.scene);
          const bprops = {
            key: tab.name,
            active,
            onPress: () => this.onPress(tab, index),
          };
          const icon = active ? `ios-${tab.icon}` : `ios-${tab.icon}-outline`;

          return (
            <Button {...bprops}>
              {badges[tabs.scene] && <Badge>{badges[tabs.scene]}</Badge>}
              {tab.name}
              <Icon name={icon} />
            </Button>
          );
        })}
      </FooterTab>
    );
  }
}
