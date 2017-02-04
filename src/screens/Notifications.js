import React, { Component } from 'react';
import styled from 'styled-components/native';

import { ErrorBar } from '../components/';
import Themed from '../styles';
import { defaults } from '../Navigator';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const Text = styled.Text`
`;


export default class Notifications extends Component {
  static navigationOptions = {
    title: 'Más',
    header: () => ({
      ...defaults.navigator.header,
      title: 'Notificationes',
    }),
  }

  state = {
    error: null,
  }

  render() {
    const { error } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <Text>
            Lorem Ipsum
          </Text>
        </Container>
      </Themed>
    );
  }
}
