import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import defaultsDeep from 'lodash/defaultsDeep';

import {
  Home, Community, About, Benefits, Enviorement,
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
        backgroundColor: colors.black,
      },
    },
  },
  tabbar: {
    common: {
      activeTintColor: colors.lightGray,
      inactiveTintColor: colors.gray,
      activeBackgroundColor: colors.lightBlack,
      inactiveBackgroundColor: colors.black,
      style: {
        backgroundColor: colors.black,
      },
    },
    ios: {
      // labelStyle
      // style
    },
    android: {
      showIcon: true,
      showLabel: true,
      // pressColor
      // pressOpacity
      scrollEnabled: false,
      upperCaseLabel: false,
      // tabStyle
      indicatorStyle: {
        backgroundColor: colors.white,
      },
      labelStyle: {
        margin: 0,
        marginTop: 3,
        fontSize: 12,
      },
    },
  },
};

const HomeScreen = StackNavigator({
  Root: {
    screen: Home,
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

const EnviorementScreen = StackNavigator({
  Root: {
    screen: Enviorement,
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
  Enviorement: {
    screen: EnviorementScreen,
  },
}, {
  // tabBarComponent: TabView.TabBarBottom,
  tabBarPosition: 'bottom', // 'top' 'bottom'
  lazyLoad: true,
  swipeEnabled: false,
  animationEnabled: false,
  initialRouteName: 'Home',
  order: ['Enviorement', 'Community', 'Home', 'Benefits', 'About'],
  tabBarOptions: defaultsDeep({}, defaults.tabbar[Platform.OS], defaults.tabbar.common),
});
