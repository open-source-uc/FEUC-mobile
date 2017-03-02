import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

import { images } from '../assets/';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image`
  resize-mode: ${Image.resizeMode.contain};
  height: 70;
  margin: 15 0;
`;

Logo.defaultProps = {
  source: images.logo.outline,
};


const Text = styled.Text`
  background-color: transparent;
  color: ${props => props.theme.colors.E};
  font-family: ${props => props.theme.fonts.headers};
  text-align: center;
  margin: 15 60;
  height: 70;
`;


export default class Loading extends PureComponent {
  static Logo = Logo
  static Text = Text

  render() {
    return (
      <Container {...this.props} />
    );
  }
}
