import { TabNavigator } from 'react-navigation';

import { Events, SavedEvents } from '../../../screens/';
import { colors, fonts } from '../../../styles';


export default TabNavigator({
  Events: {
    screen: Events,
    path: '/events',
    navigationOptions: {
      tabBar: (navigation, defaultTabBar) => ({
        ...defaultTabBar,
        label: 'Hoy'.toUpperCase(),
      }),
    },
  },
  SavedEvents: {
    screen: SavedEvents,
    path: '/saved-events',
    navigationOptions: {
      tabBar: (navigation, defaultTabBar) => ({
        ...defaultTabBar,
        label: 'Guardados'.toUpperCase(),
      }),
    },
  },
}, {
  initialRouteName: 'Events',
  tabBarPosition: 'top',
  lazyLoad: true,
  swipeEnabled: true,
  animationEnabled: true,
  order: ['Events', 'SavedEvents'],
  tabBarOptions: {
    showIcon: false,
    showLabel: true,
    activeTintColor: colors.B,
    inactiveTintColor: colors.E,
    activeBackgroundColor: colors.Z,
    inactiveBackgroundColor: colors.Z,
    style: {
      backgroundColor: colors.Z,
    },
    labelStyle: {
      fontFamily: fonts.main,
      fontSize: 13,
      fontWeight: '600',
    },
  },
  navigationOptions: {
    title: 'Eventos',
  },
});
