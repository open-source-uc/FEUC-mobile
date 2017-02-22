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
    activeTintColor: colors.lightMain,
    inactiveTintColor: colors.clear,
    activeBackgroundColor: colors.gray,
    inactiveBackgroundColor: colors.gray,
    style: {
      backgroundColor: colors.gray,
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
