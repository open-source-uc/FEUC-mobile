import React, { Component } from 'react';
import styled from 'styled-components/native';

import { MapView, TabBarIcon, NavbarButton } from '../components/';
import Themed from '../styles';
import { defaults } from '../Navigator';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;


export default class Home extends Component {
  static navigationOptions = {
    title: 'FEUC',
    tabBar: {
      label: 'Home',
      icon: props => <TabBarIcon.Home {...props} />,
    },
    header: ({ navigate }) => ({
      right: <NavbarButton name="ios-more" onPress={() => navigate('MapScreen')} />,
      ...defaults.navigator.header,
    }),
  }

  render() {
    return (
      <Themed content="dark">
        <Container>
          <MapView />
        </Container>
      </Themed>
    );
  }
}
