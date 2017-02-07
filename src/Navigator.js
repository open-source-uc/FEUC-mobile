import React from 'react';
import { Platform } from 'react-native';
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
  tabbar: {
    ios: {
      activeTintColor: colors.main,
      // activeBackgroundColor: colors.white,
      // inactiveTintColor
      // labelStyle
      // style
    },
    android: {
      activeTintColor: colors.white,
      // inactiveTintColor: colors.inactive,
      showIcon: true,
      showLabel: false,
      // pressColor
      // pressOpacity
      scrollEnabled: false,
      upperCaseLabel: false,
      // tabStyle
      // indicatorStyle
      labelStyle: {
        margin: 0,
        marginTop: 3,
        fontSize: 12,
      },
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
  // tabBarComponent: TabView.TabBarBottom,
  tabBarPosition: 'bottom', // 'top' 'bottom'
  lazyLoad: true,
  swipeEnabled: false,
  animationEnabled: false,
  initialTab: 'Home',
  order: ['Home', 'Community', 'About', 'Benefits', 'More'],
  tabBarOptions: defaults.tabbar[Platform.OS],
});
