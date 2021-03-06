import React from "react";
import { StackNavigator } from "react-navigation";

import Tabs from "./Root/";

import {
  Event,
  SearchView,
  Initiative,
  Benefit,
  BenefitActive,
  Delegationship,
  Attendances,
  Survey,
  Notifications,
  NotificationText,
  Campus,
} from "../screens/";
import { Logo, NavbarButton } from "../components/";
import { colors } from "../styles";

const options = {
  initialRouteName: "Tabs",
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

const Navigator = StackNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: {
        header: ({ state, navigate }, defaultHeader) => ({
          ...defaultHeader,
          title: <Logo center />,
          right: (
            <NavbarButton onPress={() => navigate("Notifications")}>
              <NavbarButton.NotificationCount />
              <NavbarButton.Icon name="ios-notifications" />
            </NavbarButton>
          ),
          // left: (
          //   <NavbarButton onPress={() => navigate("SearchView")}>
          //     <NavbarButton.Icon name="ios-search" />
          //   </NavbarButton>
          // ),
        }),
      },
    },
    Initiative: {
      screen: Initiative,
      navigationOptions: {
        header: (navigation, defaultHeader) => ({
          ...defaultHeader,
        }),
      },
    },
    Event: {
      screen: Event,
      navigationOptions: {
        header: (navigation, defaultHeader) => ({
          ...defaultHeader,
        }),
      },
    },
    Survey: {
      screen: Survey,
      navigationOptions: {
        header: (navigation, defaultHeader) => ({
          ...defaultHeader,
        }),
      },
    },
    Delegationship: {
      screen: Delegationship,
      navigationOptions: {
        header: (navigation, defaultHeader) => ({
          ...defaultHeader,
        }),
      },
    },
    Benefit: {
      screen: StackNavigator(
        {
          Benefit: {
            screen: Benefit,
          },
          BenefitActive: {
            screen: BenefitActive,
          },
        },
        {
          mode: "modal",
          initialRouteName: "Benefit",
          headerMode: "none",
        }
      ),
      navigationOptions: {
        header: (navigation, defaultHeader) => ({
          ...defaultHeader,
        }),
      },
    },
    Attendances: {
      screen: Attendances,
      navigationOptions: {
        header: (navigation, defaultHeader) => ({
          ...defaultHeader,
        }),
      },
    },
    SearchView: {
      screen: SearchView,
      navigationOptions: {
        header: (navigation, defaultHeader) => ({
          ...defaultHeader,
          title: "Buscar eventos".toUpperCase(),
        }),
      },
    },
    Campus: {
      screen: Campus,
      navigationOptions: {
        header: (navigation, { title, ...defaultHeader }) => ({
          ...defaultHeader,
          title: (title || "Campus").toUpperCase(),
        }),
      },
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: {
        header: (navigation, defaultHeader) => ({
          ...defaultHeader,
          title: "Notificaciones".toUpperCase(),
        }),
      },
    },
    NotificationText: {
      screen: NotificationText,
      navigationOptions: {
        header: (navigation, defaultHeader) => ({
          ...defaultHeader,
          // title: "Notificación".toUpperCase(),
        }),
      },
    },
  },
  options
);

export default Navigator;
