import { TabNavigator } from 'react-navigation';
import { StyleSheet, Platform } from 'react-native';

import { Benefits, BenefitsSaved } from '../../../screens/';
import { colors, fonts } from '../../../styles';


export default TabNavigator({
  Benefits: {
    screen: Benefits,
    path: '/benefits',
    navigationOptions: {
      tabBar: (navigation, defaultTabBar) => ({
        ...defaultTabBar,
        label: 'Beneficios'.toUpperCase(),
      }),
    },
  },
  BenefitsSaved: {
    screen: BenefitsSaved,
    path: '/my-benefits',
    navigationOptions: {
      tabBar: (navigation, defaultTabBar) => ({
        ...defaultTabBar,
        label: 'Activados'.toUpperCase(),
      }),
    },
  },
}, {
  initialRouteName: 'Benefits',
  tabBarPosition: 'top',
  lazyLoad: true,
  swipeEnabled: true,
  animationEnabled: true,
  order: ['Benefits', 'BenefitsSaved'],
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
      fontFamily: fonts.navbar,
      fontSize: 13,
      fontWeight: '600',
    },
    // indicatorStyle: {
    //   height: 10,
    //   backgroundColor: colors.B,
    // },
  },
  navigationOptions: {
    title: 'Comunidad',
  },
});
