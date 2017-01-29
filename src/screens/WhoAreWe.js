import React, { Component } from 'react';
import styled from 'styled-components/native';

import { ErrorBar, HTML } from '../components/';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
`;

const Text = styled.Text`
`;


export default class WhoAreWe extends Component {
  static navigationOptions = {
    title: '¿Quiénes somos?',
  }

  state = {
    error: null,
    content: `
    <h1>Contenido</h1>
    <p>Somos la <em>FEUC</em> y hacemos cosas</p>
    <p>Esto es una lista:
      <ul>
        <li>Primer item</li>
        <li>Segundo <a href="http://google.cl">item</a></li>
      </ul>
    </p>
    `,
  }

  render() {
    const { error, content } = this.state;

    return (
      <Themed>
        <Container>
          <ErrorBar error={error} />
          <HTML>{content}</HTML>
        </Container>
      </Themed>
    );
  }
}
