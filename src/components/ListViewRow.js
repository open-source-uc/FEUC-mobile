import React, { PropTypes, PureComponent } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import isArray from 'lodash/fp/isArray';


const TouchableHighlight = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0 15;
  min-height: 44;
`;

const TouchableNativeFeedback = styled.TouchableNativeFeedback`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0 15;
  min-height: 48;
`;

const View = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


export default class ListViewRow extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { children, ...props } = this.props;

    if (Platform.OS === 'ios') {
      return (
        <TouchableHighlight {...props}>
          {isArray(children) ? <View>{children}</View> : children}
        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableNativeFeedback {...props}>
          {isArray(children) ? <View>{children}</View> : children}
        </TouchableNativeFeedback>
      );
    }
  }
}
