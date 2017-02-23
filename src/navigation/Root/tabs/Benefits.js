import { TabNavigator } from 'react-navigation';

import { Benefits, MyBenefits } from '../../../screens/';
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
  MyBenefits: {
    screen: MyBenefits,
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
  order: ['Benefits', 'MyBenefits'],
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
    title: 'Comunidad',
  },
});
