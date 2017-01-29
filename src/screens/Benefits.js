import React, { Component } from 'react';
import styled from 'styled-components/native';

import { TabBarIcon } from '../components/';


const Container = styled.View`
`;

const Text = styled.Text`
`;


export default class Benefits extends Component {
  static navigationOptions = {
    title: 'FEUC',
    tabBar: {
      label: 'Beneficios',
      icon: props => <TabBarIcon.Benefits {...props} />,
    },
  }

  render() {
    return (
      <Container>
        <Text>
          Lorem Ipsum
        </Text>
      </Container>
    );
  }
}
