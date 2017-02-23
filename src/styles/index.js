import React, { PropTypes } from 'react';
import { StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import isArray from 'lodash/fp/isArray';

export const colors = {
  main: '#0da5a5',
  lightMain: '#0ff2e7',
  black: 'black',
  lightBlack: '#2c3f3e',
  gray: '#48605f',
  lightGray: '#8aa8a7',
  clear: '#c7d3d2',
  lightClear: '#edefef',
  error: '#e91f63',
  white: '#ffffff',
  get background() {
    return this.lightClear;
  },
  facebook: '#3b5999',
  twitter: '#55acee',
  youtube: '#cd201f',
  transparent: 'transparent',
};

export const fonts = {
  main: 'Roboto',
  get headers() {
    return this.main;
  },
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
