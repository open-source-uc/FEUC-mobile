import React, { Component } from 'react';
import { Dimensions, InteractionManager } from 'react-native';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';

import { Loading, ErrorBar } from '../components';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
`;

const StyledMap = styled(MapView)`
  flex: 1;
`;

const Button = styled.Button``;


export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'FEUC',
    header: ({ goBack }) => ({
      right: <Button title="Volver" onPress={() => goBack()} />,
    }),
  }

  state = {
    loading: true,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading, error } = this.state;

    const { width, height } = Dimensions.get('window');
    const ratio = width / height;

    const coordinates = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0922 * ratio,
    };

    return (
      <Themed>
        <Container>
          <ErrorBar error={error} />
          {loading ? <Loading /> : (
            <StyledMap
              initialRegion={coordinates}
            />
          )}
        </Container>
      </Themed>
    );
  }
}
