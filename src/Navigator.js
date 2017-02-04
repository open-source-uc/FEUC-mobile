import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import {
  Home, Community, About, Benefits, More,
  MapScreen,
  Notifications, FilterInfo, MyEvents, Contact,
  AboutDetail, Transparence,
} from './screens/';
import Logo from './components/Logo';
import { colors } from './styles';


export const defaults = {
  navigator: {
    header: {
      tintColor: colors.white,
      title: <Logo transparent />,
      style: {
        backgroundColor: colors.main,
      },
    },
  },
};

const HomeScreen = StackNavigator({
  Root: {
    screen: Home,
  },
  MapScreen: {
    screen: MapScreen,
  },
}, {
  initialRouteName: 'Root',
  mode: 'modal',
});

const CommunityScreen = StackNavigator({
  Root: {
    screen: Community,
  },
}, {
  initialRouteName: 'Root',
});

const AboutScreen = StackNavigator({
  Root: {
    screen: About,
  },
  AboutDetail: {
    screen: AboutDetail,
  },
  Transparence: {
    screen: Transparence,
  },
}, {
  initialRouteName: 'Root',
});

const BenefitsScreen = StackNavigator({
  Root: {
    screen: Benefits,
  },
}, {
  initialRouteName: 'Root',
});

const MoreScreen = StackNavigator({
  Root: {
    screen: More,
  },
  Notifications: {
    screen: Notifications,
  },
  FilterInfo: {
    screen: FilterInfo,
  },
  MyEvents: {
    screen: MyEvents,
  },
  Contact: {
    screen: Contact,
  },
}, {
  initialRouteName: 'Root',
});


// https://reactnavigation.org/docs/navigators/tab
export default TabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Community: {
    screen: CommunityScreen,
  },
  About: {
    screen: AboutScreen,
  },
  Benefits: {
    screen: BenefitsScreen,
  },
  More: {
    screen: MoreScreen,
  },
}, {
  tabBarOptions: {
    // tabBarComponent: TabView.TabBarBottom,
    tabBarPosition: 'bottom', // 'top' 'bottom'
    activeTintColor: colors.main,
    // swipeEnabled: false,
    // animationEnabled: true,
    lazyLoad: true,
    initialTab: 'Home',
    order: ['Home', 'Community', 'About', 'Benefits', 'More'],
  //   activeBackgroundColor,
  //   inactiveTintColor,
  //   inactiveBackgroundColor,
  //   inactiveBackgroundColor,
  //   style: {
  //     backgroundColor: 'blue',
  //   },
  //   showIcon
  //   showLabel
  //   upperCaseLabel
  //   scrollEnabled
  },
});
