import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import isArray from 'lodash/fp/isArray';


const TouchableHighlight = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0 15;
  height: 44;
`;

const TouchableNativeFeedback = styled.TouchableNativeFeedback`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0 15;
  height: 48;
`;

const View = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


const ListViewRow = ({ children, ...props }) => {
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
};

export default ListViewRow;
