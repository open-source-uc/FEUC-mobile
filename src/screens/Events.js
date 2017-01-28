import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  InteractionManager,
} from 'react-native';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';

import { Loading } from '../components';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;


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
        <View>
          {this.state.loading ? (
            <Loading />
          ) : (
            <MapView
              style={styles.map}
              initialRegion={coordinates}
            />
          )}
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
