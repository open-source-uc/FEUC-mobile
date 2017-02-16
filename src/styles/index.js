import React, { PropTypes } from 'react';
import { StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import isArray from 'lodash/fp/isArray';

export const colors = {
  main: '#0da5a5',
  lightMain: '#0ff2e7',
  black: '#243332',
  lightBlack: '#2c3f3e',
  gray: '#48605f',
  lightGray: '#8aa8a7',
  white: '#c7d3d2',
  lightWhite: '#edefef',
  error: '#e91f63',
  get background() {
    return this.lightWhite;
  },
};

export const fonts = {
  main: 'Roboto',
};

export const map = require('./map.json'); // eslint-disable-line


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
      barStyle={content === 'dark' ? 'light-content' : 'dark-content'}
    />
    <ThemeProvider theme={{ colors, fonts }} {...theme}>
      {isArray(children) ? (<View>{children}</View>) : children}
    </ThemeProvider>
  </Screen>
);

Themed.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.any,
  content: PropTypes.string,
};

Themed.defaultProps = {
  content: 'light', // 'dark-content' or 'light-content'
  children: null,
  theme: {},
};

export default Themed;
