import { TabNavigator } from "react-navigation";
import { StyleSheet, Platform } from "react-native";

import { EventsToday, Events, EventsSaved } from "../../../screens/";
import { colors, fonts } from "../../../styles";

export default TabNavigator(
  {
    EventsToday: {
      screen: EventsToday,
      navigationOptions: {
        tabBar: (navigation, defaultTabBar) => ({
          ...defaultTabBar,
          label: "Hoy".toUpperCase(),
        }),
      },
    },
    Events: {
      screen: Events,
      navigationOptions: {
        tabBar: (navigation, defaultTabBar) => ({
          ...defaultTabBar,
          label: "Esta semana".toUpperCase(),
        }),
      },
    },
    EventsSaved: {
      screen: EventsSaved,
      navigationOptions: {
        tabBar: (navigation, defaultTabBar) => ({
          ...defaultTabBar,
          label: "Guardados".toUpperCase(),
        }),
      },
    },
  },
  {
    initialRouteName: "EventsToday",
    tabBarPosition: "top",
    lazyLoad: true,
    swipeEnabled: false,
    animationEnabled: true,
    order: ["EventsToday", "Events", "EventsSaved"],
    tabBarOptions: {
      showIcon: false,
      showLabel: true,
      activeTintColor: colors.B,
      inactiveTintColor: colors.E,
      activeBackgroundColor: colors.Z,
      inactiveBackgroundColor: colors.Z,
      style: {
        backgroundColor: colors.Z,
        borderBottomWidth: Platform.OS === "ios" ? StyleSheet.hairlineWidth : 0,
        borderBottomColor: colors.separator,
      },
      labelStyle: {
        fontFamily: fonts.main,
        fontSize: 12,
        fontWeight: "600",
        textAlign: "center",
      },
      indicatorStyle: {
        backgroundColor: colors.B,
      },
    },
    navigationOptions: {
      title: "Eventos",
    },
  }
);
