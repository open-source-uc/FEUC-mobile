import React, { Component } from 'react';
import styled from 'styled-components/native';

import { TabBarIcon } from '../components/';


const Container = styled.View`
`;

const Text = styled.Text`
`;

const Button = styled.Button``;


export default class Home extends Component {
  static navigationOptions = {
    title: 'FEUC',
    tabBar: {
      label: 'Home',
      icon: props => <TabBarIcon.Home {...props} />,
    },
    header: ({ navigate }) => ({
      right: <Button title="Mapa" onPress={() => navigate('MapScreen')} />,
    }),
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
