import React, { Component } from 'react';
import { Dimensions, InteractionManager } from 'react-native';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';

import { Loading, ErrorBar } from '../components';
import Themed from '../styles';
import { mapStyle } from '../assets';
import { defaults } from '../Navigator';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const StyledMap = styled(MapView)`
  flex: 1;
`;

const Button = styled.Button`
  color: white;
`;


export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'FEUC',
    header: ({ goBack }) => ({
      right: <Button title="Volver" onPress={() => goBack()} />,
      ...defaults.navigator.header,
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
      latitude: -33.498395,
      longitude: -70.611303,
      latitudeDelta: 0.010,
      longitudeDelta: 0.010 * ratio,
    };

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          {loading ? <Loading /> : (
            <StyledMap
              initialRegion={coordinates}
              provider={MapView.PROVIDER_GOOGLE}
              customMapStyle={mapStyle}
            />
          )}
        </Container>
      </Themed>
    );
  }
}
