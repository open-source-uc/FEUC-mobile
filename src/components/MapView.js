import React, { Component } from "react";
import { Dimensions, InteractionManager } from "react-native";
import PropTypes from "prop-types";
import MapView from "react-native-maps";
import styled from "styled-components/native";
import get from "lodash/get";

import Loading from "./Loading";
import { map as mapStyle } from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const StyledMap = styled(MapView)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default class MapViewComponent extends Component {
  static Marker = MapView.Marker;

  static propTypes = {
    ...MapView.propTypes,
    children: PropTypes.node,
    initial: PropTypes.object,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  };

  static defaultProps = {
    children: null,
    initial: {
      latitude: -33.498395,
      longitude: -70.611303,
    },
  };

  static parseAddress = location => {
    return [get(location, ["street1"]), get(location, ["suburb"])]
      .filter(Boolean)
      .join(", ");
  };

  static parseLocation = location => {
    const [longitude, latitude] = get(location, "geo", []);
    return { longitude, latitude };
  };

  state = {
    loading: true,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }

  animateToCoordinate = coordinates => {
    this.map && this.map.animateToCoordinate(coordinates);
  };

  render() {
    const { children, mapType, initial, ...props } = this.props;
    const { loading } = this.state;

    const { width, height } = Dimensions.get("window");
    const ratio = width / height;

    const coordinates = {
      latitude: initial.latitude,
      longitude: initial.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01 * ratio,
    };

    return (
      <Container {...props}>
        {loading
          ? <Loading />
          : <StyledMap
              innerRef={ref => (this.map = ref)}
              mapType={mapType}
              initialRegion={coordinates}
              // provider={MapView.PROVIDER_GOOGLE}
              customMapStyle={mapStyle}
              showsUserLocation
              showsMyLocationButton
              showsPointsOfInterest
              showsCompass
              showsBuildings
              showsIndoors
              zoomEnabled
              rotateEnabled
              scrollEnabled
              pitchEnabled
            >
              {children}
            </StyledMap>}
      </Container>
    );
  }
}
