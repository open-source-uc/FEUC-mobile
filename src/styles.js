import React, { PropTypes } from 'react';
import { StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import isArray from 'lodash/fp/isArray';

export const colors = {
  main: '#e91f63',
  error: '#e91f63',
};

export const fonts = {

};


const Screen = styled.View`
  flex: 1;
  background-color: transparent;
`;
// background-color: ${props => (props.content === 'dark' ? 'black' : 'white')};

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
