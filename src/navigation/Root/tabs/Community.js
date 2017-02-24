import { TabNavigator } from 'react-navigation';

import { Initiatives, Delegationships } from '../../../screens/';
import { colors, fonts } from '../../../styles';


export default TabNavigator({
  Initiatives: {
    screen: Initiatives,
    path: '/initiatives',
    navigationOptions: {
      tabBar: (navigation, defaultTabBar) => ({
        ...defaultTabBar,
        label: 'Iniciativas UC'.toUpperCase(),
      }),
    },
  },
  Delegationships: {
    screen: Delegationships,
    path: '/delegationships',
    navigationOptions: {
      tabBar: (navigation, defaultTabBar) => ({
        ...defaultTabBar,
        label: 'Vocalías'.toUpperCase(),
      }),
    },
  },
}, {
  initialRouteName: 'Initiatives',
  tabBarPosition: 'top',
  lazyLoad: true,
  swipeEnabled: true,
  animationEnabled: true,
  order: ['Initiatives', 'Delegationships'],
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
    title: 'Comunidad',
  },
});
