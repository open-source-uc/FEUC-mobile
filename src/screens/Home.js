import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import {
  Header,
  Footer,
  Title,
  Content,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import { Container, TabBar } from '../components';


export default class Home extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Title>Home</Title>
        </Header>

        <Content scrollEnabled={false}>
          <TouchableHighlight onPress={Actions.events}>
            <Text style={styles.welcome}>
              Welcome to React Native!
            </Text>
          </TouchableHighlight>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        </Content>

        <Footer>
          <TabBar selected="home" />
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
