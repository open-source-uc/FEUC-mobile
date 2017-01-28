import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  InteractionManager,
} from 'react-native';
import {
  Header,
  Title,
  Footer,
  Button,
  Icon,
} from 'native-base';
import MapView from 'react-native-maps';

import { Container, Loading, TabBar } from '../components';


export default class Events extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { width, height } = Dimensions.get('window');
    const ratio = width / height;

    const coordinates = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0922 * ratio,
    };

    return (
      <Container>
        <Header>
          <Title>Map</Title>
          <Button transparent>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <View style={styles.container}>
          {this.state.loading ? (
            <Loading />
          ) : (
            <MapView
              style={styles.map}
              initialRegion={coordinates}
            />
          )}
        </View>

        <Footer>
          <TabBar selected="events" />
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    marginTop: 1.5,
    ...StyleSheet.absoluteFillObject,
  },
});
