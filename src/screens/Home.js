import React, { Component } from 'react';
import styled from 'styled-components/native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import { MapView, TabBarIcon, NavbarButton } from '../components/';
import Themed, { colors } from '../styles';
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

  state = {
    index: 0,
    routes: [
      { key: '1', title: 'First' },
      { key: '2', title: 'Second' },
      { key: '3', title: 'Second' },
    ],
  };

  handleChangeTab = (index) => {
    this.setState({ index });
  };

  renderHeader = (props) => {
    return (
      <TabBar
        {...props}
        style={{ backgroundColor: colors.black }}
        scrollEnabled={false}
        indicatorStyle={{ backgroundColor: colors.main }}
        // labelStyle={{ color }}
      />
    );
  };

  renderScene = ({ route }) => {
    return (
      <Container>
        <MapView />
      </Container>
    );
  };

  render() {
    return (
      <Themed content="dark">
        <TabViewAnimated
          style={{ flex: 1 }}
          swipeEnabled={false}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          onRequestChangeTab={this.handleChangeTab}
        />
      </Themed>
    );
  }
}
