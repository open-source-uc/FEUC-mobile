import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import defaultsDeep from 'lodash/defaultsDeep';

import HomeTab from './tabs/Home';
import EventsTab from './tabs/Events';
import CommunityTab from './tabs/Community';
import AboutTab from './tabs/About';
import BenefitsTab from './tabs/Benefits';
import EnviorementTab from './tabs/Enviorement';

import { TabBarIcon } from '../../components/';
import { colors } from '../../styles';

// See: https://reactnavigation.org/docs/navigators/tab
const options = {
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

  },
  android: {
    showIcon: true,
    showLabel: true,
    scrollEnabled: false,
    upperCaseLabel: false,
    indicatorStyle: {
      backgroundColor: colors.clear,
    },
    labelStyle: {
      margin: 0,
      marginTop: 3,
      fontSize: 12,
    },
  },
};


// https://reactnavigation.org/docs/navigators/tab
export default TabNavigator({
  HomeTab: {
    screen: HomeTab,
    path: '/home',
    navigationOptions: {
      tabBar: (navigation, defaultTabBar) => ({
        ...defaultTabBar,
        label: 'Home',
        icon: props => <TabBarIcon.Home {...props} />,
      }),
      header: ({ state }, defaultHeader) => ({ // FIXME: not working
        ...defaultHeader,
        title: 'Home',
        visible: true,
      }),
    },
  },
  EventsTab: {
    screen: EventsTab,
    path: '/home',
    navigationOptions: {
      tabBar: (navigation, defaultTabBar) => ({
        ...defaultTabBar,
        label: 'Eventos',
        icon: props => <TabBarIcon.Events {...props} />,
      }),
      header: ({ state }, defaultHeader) => ({ // FIXME: not working
        ...defaultHeader,
        title: 'Eventos',
        visible: true,
      }),
    },
  },
  CommunityTab: {
    screen: CommunityTab,
    path: '/community',
    navigationOptions: {
      tabBar: (navigation, defaultTabBar) => ({
        ...defaultTabBar,
        label: 'Comunidad',
        icon: props => <TabBarIcon.Community {...props} />,
      }),
      header: ({ state }, defaultHeader) => ({ // FIXME: not working
        ...defaultHeader,
        title: 'Comunidad',
        visible: true,
      }),
    },
  },
  AboutTab: {
    screen: AboutTab,
    path: '/about',
    navigationOptions: {
      tabBar: (navigation, defaultTabBar) => ({
        ...defaultTabBar,
        label: 'FEUC',
        icon: props => <TabBarIcon.About {...props} />,
      }),
      header: ({ state }, defaultHeader) => ({ // FIXME: not working
        ...defaultHeader,
        title: 'FEUC',
        visible: true,
      }),
    },
  },
  BenefitsTab: {
    screen: BenefitsTab,
    path: '/benefits',
    navigationOptions: {
      tabBar: (navigation, defaultTabBar) => ({
        ...defaultTabBar,
        label: 'Beneficios',
        icon: props => <TabBarIcon.Benefits {...props} />,
      }),
      header: ({ state }, defaultHeader) => ({ // FIXME: not working
        ...defaultHeader,
        title: 'Beneficios',
        visible: true,
      }),
    },
  },
  EnviorementTab: {
    screen: EnviorementTab,
    path: '/enviorement',
    navigationOptions: {
      tabBar: (navigation, defaultTabBar) => ({
        ...defaultTabBar,
        label: 'Huella',
        icon: props => <TabBarIcon.Enviorement {...props} />,
      }),
      header: ({ state }, defaultHeader) => ({ // FIXME: not working
        ...defaultHeader,
        title: 'Huella',
        visible: true,
      }),
    },
  },
}, {
  tabBarPosition: 'bottom', // 'top' 'bottom'
  lazyLoad: true,
  swipeEnabled: false,
  animationEnabled: false,
  initialRouteName: 'EventsTab',
  order: ['EnviorementTab', 'CommunityTab', 'EventsTab', 'BenefitsTab', 'AboutTab'],
  tabBarOptions: defaultsDeep({}, options[Platform.OS], options.common),
});
