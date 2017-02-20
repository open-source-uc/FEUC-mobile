import React, { PropTypes, PureComponent } from 'react';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import isArray from 'lodash/fp/isArray';


const ContainerIOS = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.colors[props.background]};
  padding: 0 15;
  min-height: 44;
`;

const ContainerAndroid = styled.TouchableNativeFeedback`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.colors[props.background]};
  padding: 0 18;
  min-height: 48;
`;

const Children = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.View`
  flex: 1;
  padding: 10 10;
  margin: 8 0 12 2;
`;

const Title = styled.Text`
  background-color: transparent;
  color: ${props => props.theme.colors.lightBlack};
  font-family: ${props => props.theme.fonts.headers};
  font-size: 14;
  margin-bottom: 2;
`;

Title.defaultProps = {
  numberOfLines: 1,
};

const Body = styled.Text`
  background-color: transparent;
  color: ${props => props.theme.colors.gray};
  font-family: ${props => props.theme.fonts.headers};
  font-size: 11;
  line-height: 16;
`;

Body.defaultProps = {
  numberOfLines: 3,
};

const Thumbnail = styled.Image`
  background-color: ${props => props.theme.colors.white};
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size / 2};
`;

Thumbnail.defaultProps = {
  size: 60,
  elevation: 5,
};

const Disclosure = styled(Ionicons)`
  width: ${props => props.size};
  height: ${props => props.size};
  color: ${props => props.theme.colors.main};
  text-align: right;
`;

Disclosure.defaultProps = {
  size: 15,
  name: 'ios-arrow-forward',
};


export default class ListViewRow extends PureComponent {
  static Content = Content
  static Thumbnail = Thumbnail
  static Title = Title
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
