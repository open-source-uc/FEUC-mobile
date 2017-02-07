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

const TouchableHighlightInner = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


const TouchableNativeFeedback = styled.TouchableNativeFeedback``;

const TouchableNativeFeedbackInner = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0 18;
  min-height: 48;
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
          {isArray(children) ? (
            <TouchableHighlightInner>{children}</TouchableHighlightInner>
          ) : children}
        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableNativeFeedback {...props}>
          <TouchableNativeFeedbackInner>
            {children}
          </TouchableNativeFeedbackInner>
        </TouchableNativeFeedback>
      );
    }
  }
}
