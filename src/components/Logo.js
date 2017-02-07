import React, { PropTypes, PureComponent } from 'react';
import { Platform, Image } from 'react-native';
import styled from 'styled-components/native';

import { images } from '../assets';


const View = styled.View`
  flex: 1;
  justify-content: ${Platform.OS === 'ios' ? 'center' : 'flex-start'};
  padding-left: ${Platform.OS === 'ios' ? 0 : 18};
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.Image`
  height: 38;
  width: 60;
  background-color: transparent;
  margin-bottom: 4;
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
        <Logo source={source} transparent={transparent} />
      </View>
    );
  }
}
