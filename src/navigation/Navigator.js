// import React from 'react';
import { StackNavigator } from 'react-navigation';

import Tabs from './Root/';

import { Event, Initiative, Benefit, AboutDetail, Transparence, BenefitActive, Delegationship } from '../screens/';
// import { Logo } from '../components/';
import { colors } from '../styles';

const options = {
  initialRouteName: 'Tabs',
  navigationOptions: {
    header: () => ({
      tintColor: colors.Z,
      // title: 'FEUC',
      visible: true,
      // title: () => <Logo transparent />,
      style: {
        backgroundColor: colors.B,
      },
    }),
  },
};

function getTitle(state) {
  const route = state.routes[state.index];
  switch (route.routeName) {
    case 'EventsTab': return 'Home';
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
  Initiative: {
    screen: Initiative,
    path: '/initiative',
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
  Delegationship: {
    screen: Delegationship,
    path: '/delegationship',
    navigationOptions: {
      header: (navigation, defaultHeader) => ({
        ...defaultHeader,
      }),
    },
  },
  Benefits: {
    screen: StackNavigator({
      Benefit: {
        screen: Benefit,
        path: '/benefit',
      },
      BenefitActive: {
        screen: BenefitActive,
        path: '/benefit-active',
      },
    }, {
      mode: 'modal',
      initialRouteName: 'Benefit',
      headerMode: 'none',
    }),
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
