// import React from 'react';
import { StackNavigator } from 'react-navigation';

import Tabs from './Root/';

import { Event, Community, AboutDetail, Transparence } from '../screens/';
// import { Logo } from '../components/';
import { colors } from '../styles';

const options = {
  initialRouteName: 'Tabs',
  navigationOptions: {
    header: () => ({
      tintColor: colors.lightClear,
      title: 'FEUC',
      visible: true,
      // title: () => <Logo transparent />,
      style: {
        backgroundColor: colors.gray,
      },
    }),
  },
};

function getTitle(state) {
  const route = state.routes[state.index];
  switch (route.routeName) {
    case 'HomeTab': return 'Home';
    case 'BenefitsTab': return 'Beneficios';
    case 'CommunityTab': return 'Comunidad';
    case 'AboutTab': return 'FEUC';
    case 'EnviorementTab': return 'Huella';
    default: return 'FEUC';
  }
}

const Navigator = StackNavigator({
  Tabs: {
    screen: Tabs,
    path: '/',
    navigationOptions: {
      header: ({ state }, defaultHeader) => ({
        ...defaultHeader,
        title: getTitle(state).toUpperCase(),
      }),
      // header: (navigation, defaultHeader) => ({
      //   ...defaultHeader,
      //   visible: false,
      // }),
    },
  },
  Community: {
    screen: Community,
    path: '/community',
    navigationOptions: {
      header: (navigation, defaultHeader) => ({
        ...defaultHeader,
      }),
    },
  },
  Event: {
    screen: Event,
    path: '/event',
    navigationOptions: {
      header: (navigation, defaultHeader) => ({
        ...defaultHeader,
      }),
    },
  },
  AboutDetail: {
    screen: AboutDetail,
    path: '/aboutdetail',
    navigationOptions: {
      header: (navigation, defaultHeader) => ({
        ...defaultHeader,
      }),
    },
  },
  Transparence: {
    screen: Transparence,
    path: '/transparence',
    navigationOptions: {
      header: (navigation, defaultHeader) => ({
        ...defaultHeader,
      }),
    },
  },
}, options);

export default Navigator;
