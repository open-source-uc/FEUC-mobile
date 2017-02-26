import { TabNavigator } from 'react-navigation';
import { StyleSheet, Platform } from 'react-native';

import { Events, EventsSaved } from '../../../screens/';
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
  EventsSaved: {
    screen: EventsSaved,
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
  order: ['Events', 'EventsSaved'],
  tabBarOptions: {
    showIcon: false,
    showLabel: true,
    activeTintColor: colors.B,
    inactiveTintColor: colors.E,
    activeBackgroundColor: colors.Z,
    inactiveBackgroundColor: colors.Z,
    style: {
      backgroundColor: colors.Z,
      borderBottomWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
      borderBottomColor: colors.separator,
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
