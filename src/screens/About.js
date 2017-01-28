import React, { Component } from 'react';
import styled from 'styled-components/native';

import { TabBarIcon } from '../components/';


const Container = styled.View`
`;

const Text = styled.Text`
`;


export default class About extends Component {
  static navigationOptions = {
    title: 'FEUC',
    tabBar: {
      label: 'FEUC',
      icon: props => <TabBarIcon.About {...props} />,
    },
  }

  render() {
    return (
      <Container>
        <Text>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </Container>
    );
  }
}
