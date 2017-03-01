import React, { PropTypes, PureComponent } from 'react';
import { Platform } from 'react-native';
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
  height: 34;
  width: 60;
  background-color: transparent;
  margin-bottom: 5;
`;


export default class Loading extends PureComponent {
  static propTypes = {
    source: PropTypes.any,
  }

  static defaultProps = {
    source: images.logo.transparent,
  }

  render() {
    const { source, ...props } = this.props;
    return (
      <View {...props}>
        <Logo source={source} />
      </View>
    );
  }
}
