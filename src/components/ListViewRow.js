import React, { PropTypes, PureComponent } from 'react';
import { Platform, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import isArray from 'lodash/fp/isArray';

import RichText from './RichText';
import Thumbnail from './Thumbnail';


const ContainerIOS = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.colors[props.background]};
  padding: 15 15;
  min-height: 44;
  border-top-width: ${props => (props.first ? StyleSheet.hairlineWidth : 0)};
  border-top-color: ${props => props.theme.colors.separator};
  border-bottom-width: ${props => (props.last ? StyleSheet.hairlineWidth : 0)};
  border-bottom-color: ${props => props.theme.colors.separator};
`;

ContainerIOS.defaultProps = {
  background: 'white',
};

const ContainerAndroid = styled.TouchableNativeFeedback`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.colors[props.background]};
  padding: 15 18;
  min-height: 48;
`;

ContainerAndroid.defaultProps = {
  background: 'white',
};

const Children = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.View`
  flex: 1;
  padding: 0 15 0 17;
  margin: 4 0 8 0;
`;

const Title = styled.Text`
  background-color: transparent;
  color: ${props => props.theme.colors.G};
  font-family: ${props => props.theme.fonts.headers};
  font-size: 14;
  margin-bottom: 2;
`;

Title.defaultProps = {
  numberOfLines: 1,
};

const Footer = styled.Text`
  background-color: transparent;
  color: ${props => props.theme.colors.B};
  font-family: ${props => props.theme.fonts.main};
  font-size: 9;
  margin: 4 0 2;
`;

const Body = styled(RichText)`
  background-color: transparent;
  color: ${props => props.theme.colors.F};
  font-family: ${props => props.theme.fonts.main};
  font-size: 11;
  line-height: 16;
`;

Body.defaultProps = {
  numberOfLines: 3,
};

const Disclosure = styled(Ionicons)`
  width: ${props => props.size};
  height: ${props => props.size};
  color: ${props => props.theme.colors.G};
  text-align: right;
  margin-right: 2;
  width: 8;
`;

Disclosure.defaultProps = {
  size: 15,
  name: 'ios-arrow-forward',
};


export default class ListViewRow extends PureComponent {
  static Content = Content
  static Thumbnail = Thumbnail
  static Title = Title
  static Footer = Footer
  static Body = Body
  static Disclosure = Disclosure

  static propTypes = {
    children: PropTypes.any,
    background: PropTypes.string.isRequired,
  }

  static defaultProps = {
    children: null,
    background: 'white',
  }

  render() {
    const { children, ...props } = this.props;

    if (Platform.OS === 'ios') {
      return (
        <ContainerIOS {...props}>
          {isArray(children) ? (
            <Children>{children}</Children>
          ) : children}
        </ContainerIOS>
      );
    } else {
      return (
        <ContainerAndroid {...props}>
          {isArray(children) ? (
            <Children>{children}</Children>
          ) : children}
        </ContainerAndroid>
      );
    }
  }
}
