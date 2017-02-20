import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import defaultsDeep from 'lodash/defaultsDeep';

import {
  Home, Delegationships, Initiatives, About, Benefits, Enviorement,
  Notifications, FilterInfo, MyEvents, Contact, Event,
  AboutDetail, Transparence,
} from './screens/';
import Logo from './components/Logo';
import { colors, fonts } from './styles';


export const defaults = {
  navigator: {
    header: {
      tintColor: colors.clear,
      title: <Logo transparent />,
      style: {
        backgroundColor: colors.gray,
      },
    },
  },
  tabbar: {
    common: {
      activeTintColor: colors.lightBlack,
      inactiveTintColor: colors.lightGray,
      activeBackgroundColor: colors.white,
      inactiveBackgroundColor: colors.white,
      style: {
        backgroundColor: colors.white,
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
        backgroundColor: colors.clear,
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
    screen: TabNavigator({
      Initiatives: {
        screen: Initiatives,
      },
      Delegationships: {
        screen: Delegationships,
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
    }),
  },
}, {
  initialRouteName: 'Root',
  navigationOptions: {
    // header: {
    //   style: {
    //     backgroundColor: colors.gray,
    //     borderWidth: 0,
    //     borderColor: 'transparent',
    //   },
    // },
  },
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
  initialRouteName: 'Community',
  order: ['Enviorement', 'Community', 'Home', 'Benefits', 'About'],
  tabBarOptions: defaultsDeep({}, defaults.tabbar[Platform.OS], defaults.tabbar.common),
});
