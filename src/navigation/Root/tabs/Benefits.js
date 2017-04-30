import { TabNavigator } from "react-navigation";
import { StyleSheet, Platform } from "react-native";

import { Benefits, BenefitsSaved } from "../../../screens/";
import { colors, fonts } from "../../../styles";

export default TabNavigator(
  {
    Benefits: {
      screen: Benefits,
      navigationOptions: {
        tabBar: (navigation, defaultTabBar) => ({
          ...defaultTabBar,
          label: "Beneficios".toUpperCase(),
        }),
      },
    },
    BenefitsSaved: {
      screen: BenefitsSaved,
      navigationOptions: {
        tabBar: (navigation, defaultTabBar) => ({
          ...defaultTabBar,
          label: "Activados".toUpperCase(),
        }),
      },
    },
  },
  {
    initialRouteName: "Benefits",
    tabBarPosition: "top",
    lazyLoad: true,
    swipeEnabled: false,
    animationEnabled: true,
    order: ["Benefits", "BenefitsSaved"],
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
        fontFamily: fonts.navbar,
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
