/* eslint react/display-name: 0 */

import React from "react";
import { Platform } from "react-native";
import { TabNavigator } from "react-navigation";
import defaultsDeep from "lodash/defaultsDeep";

import EventsTab from "./tabs/Events";
import CommunityTab from "./tabs/Community";
import MapsTab from "./tabs/Maps";
import BenefitsTab from "./tabs/Benefits";
import SurveysTab from "./tabs/Surveys";

import { TabBarIcon } from "../../components/";
import { colors } from "../../styles";

// See: https://reactnavigation.org/docs/navigators/tab
const options = {
  common: {
    activeTintColor: colors.G,
    inactiveTintColor: colors.E,
    activeBackgroundColor: colors.Z,
    inactiveBackgroundColor: colors.Z,
    style: {
      backgroundColor: colors.Z,
    },
  },
  ios: {},
  android: {
    showIcon: true,
    showLabel: true,
    scrollEnabled: false,
    upperCaseLabel: false,
    indicatorStyle: {
      backgroundColor: "transparent",
    },
    labelStyle: {
      margin: 0,
      marginTop: 3,
      fontSize: 12,
    },
  },
};

// https://reactnavigation.org/docs/navigators/tab
export default TabNavigator(
  {
    EventsTab: {
      screen: EventsTab,
      navigationOptions: {
        tabBar: (navigation, defaultTabBar) => ({
          ...defaultTabBar,
          label: "Eventos",
          icon: props => <TabBarIcon.Events {...props} />,
        }),
        header: ({ state }, defaultHeader) => ({
          // FIXME: not working
          ...defaultHeader,
          title: "Eventos",
          visible: true,
        }),
      },
    },
    CommunityTab: {
      screen: CommunityTab,
      navigationOptions: {
        tabBar: (navigation, defaultTabBar) => ({
          ...defaultTabBar,
          label: "Comunidad",
          icon: props => <TabBarIcon.Community {...props} />,
        }),
        header: ({ state }, defaultHeader) => ({
          // FIXME: not working
          ...defaultHeader,
          title: "Comunidad",
          visible: true,
        }),
      },
    },
    MapsTab: {
      screen: MapsTab,
      navigationOptions: {
        tabBar: (navigation, defaultTabBar) => ({
          ...defaultTabBar,
          label: "Mapas",
          icon: props => <TabBarIcon.Maps {...props} />,
        }),
        header: ({ state }, defaultHeader) => ({
          // FIXME: not working
          ...defaultHeader,
          title: "Mapas",
          visible: true,
        }),
      },
    },
    BenefitsTab: {
      screen: BenefitsTab,
      navigationOptions: {
        tabBar: (navigation, defaultTabBar) => ({
          ...defaultTabBar,
          label: "Beneficios",
          icon: props => <TabBarIcon.Benefits {...props} />,
        }),
        header: ({ state }, defaultHeader) => ({
          // FIXME: not working
          ...defaultHeader,
          title: "Beneficios",
          visible: true,
        }),
      },
    },
    SurveysTab: {
      screen: SurveysTab,
      navigationOptions: {
        tabBar: (navigation, defaultTabBar) => ({
          ...defaultTabBar,
          label: "Encuestas",
          icon: props => <TabBarIcon.Surveys {...props} />,
        }),
        header: ({ state }, defaultHeader) => ({
          // FIXME: not working
          ...defaultHeader,
          title: "Encuestas",
          visible: true,
        }),
      },
    },
  },
  {
    tabBarPosition: "bottom", // 'top' 'bottom'
    lazyLoad: true,
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: "EventsTab",
    order: [
      "CommunityTab",
      "SurveysTab",
      "EventsTab",
      "BenefitsTab",
      "MapsTab",
    ],
    tabBarOptions: defaultsDeep({}, options[Platform.OS], options.common),
  }
);
