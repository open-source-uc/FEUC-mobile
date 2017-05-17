import { TabNavigator } from "react-navigation";
import { StyleSheet, Platform } from "react-native";

import { Initiatives, Delegationships, About } from "../../../screens/";
import { colors, fonts } from "../../../styles";

export default TabNavigator(
  {
    About: {
      screen: About,
      navigationOptions: {
        tabBar: (navigation, defaultTabBar) => ({
          ...defaultTabBar,
          label: "FEUC",
        }),
      },
    },
    Initiatives: {
      screen: Initiatives,
      navigationOptions: {
        tabBar: (navigation, defaultTabBar) => ({
          ...defaultTabBar,
          label: "Iniciativas UC".toUpperCase(),
        }),
      },
    },
    Delegationships: {
      screen: Delegationships,
      navigationOptions: {
        tabBar: (navigation, defaultTabBar) => ({
          ...defaultTabBar,
          label: "Vocalías".toUpperCase(),
        }),
      },
    },
  },
  {
    initialRouteName: "About",
    tabBarPosition: "top",
    lazyLoad: true,
    swipeEnabled: false,
    animationEnabled: false,
    order: ["About", "Initiatives", "Delegationships"],
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
        fontSize: 13,
        fontWeight: "600",
      },
      indicatorStyle: {
        backgroundColor: colors.B,
      },
    },
    navigationOptions: {
      title: "Comunidad",
    },
  }
);
