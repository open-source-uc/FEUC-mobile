import React from "react";
import { StatusBar } from "react-native";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components/native";
import isArray from "lodash/fp/isArray";

export const colors = {
  Y: "#F2F2F277",
  X: "#F2F2F2",
  Z: "#FFFFFF",
  A: "#43D1C0",
  B: "#34A79D",
  C: "#2E8E82",
  D: "#F2F2F2",
  E: "#8E8E8E",
  F: "#282828",
  G: "#191919",

  separator: "#C8C7CC",

  get black() {
    return this.G;
  },

  get white() {
    return this.Z;
  },

  error: "#e91f63",
  transparent: "transparent",
  get background() {
    return "#F7F7F7";
  },

  facebook: "#3b5999",
  twitter: "#55acee",
  youtube: "#cd201f",
  tumblr: "#34465d",
  medium: "#02b875",
  instagram: "#e4405f",
  snapchat: "#FFFC00",
};

export const fonts = {
  main: "Muli",
  headers: "Muli",
  navbar: "Muli",
  body: "Roboto",
};

export const map = require("./map.json"); // eslint-disable-line

const Screen = styled.View`
  flex: 1;
  background-color: transparent;
`;

const View = styled.View`
  flex: 1;
  background-color: transparent;
`;

const Themed = ({ children, content, theme, ...props }) => (
  <Screen content={content} {...props}>
    <StatusBar
      barStyle={content === "dark" ? "light-content" : "dark-content"}
    />
    <ThemeProvider theme={{ colors, fonts }} {...theme}>
      {isArray(children) ? <View>{children}</View> : children}
    </ThemeProvider>
  </Screen>
);

Themed.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.any,
  content: PropTypes.string,
};

Themed.defaultProps = {
  content: "light", // 'dark-content' or 'light-content'
  children: null,
  theme: {},
};

export default Themed;
