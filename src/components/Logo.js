import React, { PropTypes, PureComponent } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

import { images } from '../assets';


const Logo = styled.Image`
  height: 38;
  background-color: transparent;
  margin-bottom: 4;
`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;


export default class Loading extends PureComponent {
  static propTypes = {
    source: PropTypes.any,
    transparent: PropTypes.bool,
  }

  static defaultProps = {
    source: images.logo.transparent,
    transparent: false,
  }

  render() {
    const { source, transparent, ...props } = this.props;
    return (
      <View {...props}>
        <Logo resizeMode={Image.resizeMode.contain} source={source} transparent={transparent} />
      </View>
    );
  }
}
