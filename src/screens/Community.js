import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Header,
  Footer,
  Title,
} from 'native-base';
import styled from 'styled-components/native';

import { Container, TabBar } from '../components';


const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`

`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default class Community extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Title>Community</Title>
        </Header>

        <Content>
          <Text>Hola</Text>
        </Content>
        {/* <View style={styles.container}>
          <Text>Hola</Text>
        </View> */}

        <Footer>
          <TabBar selected="community" />
        </Footer>
      </Container>
    );
  }
}
