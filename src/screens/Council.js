import React, { Component } from 'react';
import styled from 'styled-components/native';

import { ErrorBar } from '../components/';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
`;

const Text = styled.Text`
`;


export default class Council extends Component {
  static navigationOptions = {
    title: 'Consejo FEUC',
  }

  state = {
    error: null,
  }

  render() {
    const { error } = this.state;

    return (
      <Themed>
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
