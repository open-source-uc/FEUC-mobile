import React, { Component } from 'react';
import { Dimensions, InteractionManager } from 'react-native';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';

import Loading from './Loading';
import { map as mapStyle } from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const StyledMap = styled(MapView)`
  flex: 1;
`;


export default class MapViewComponent extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading } = this.state;

    const { width, height } = Dimensions.get('window');
    const ratio = width / height;

    const coordinates = {
      latitude: -33.498395,
      longitude: -70.611303,
      latitudeDelta: 0.010,
      longitudeDelta: 0.010 * ratio,
    };

    return (
      <Container>
        {loading ? <Loading /> : (
          <StyledMap
            initialRegion={coordinates}
            provider={MapView.PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
          />
        )}
      </Container>
    );
  }
}
