import React, { PureComponent } from 'react';
import styled from 'styled-components/native';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;


const Text = styled.Text`

`;

export default class Loading extends PureComponent {
  render = () => (
    <View>
      <Text>Loading...</Text>
    </View>
  )
}
