import React, { PureComponent } from "react";
import { Dimensions, InteractionManager } from "react-native";
import PropTypes from "prop-types";
import Maps from "react-native-maps";
import styled from "styled-components/native";

import Loading from "./Loading";
import { map as mapStyle } from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const StyledMap = styled(Maps)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default class MapView extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  state = {
    loading: true,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const props = this.props;
    const { loading } = this.state;

    const { width, height } = Dimensions.get("window");
    const ratio = width / height;

    const coordinates = {
      latitude: -33.498395,
      longitude: -70.611303,
      latitudeDelta: 0.010,
      longitudeDelta: 0.010 * ratio,
    };

    return (
      <Container {...props}>
        {loading
          ? <Loading />
          : <StyledMap
              initialRegion={coordinates}
              provider={MapView.PROVIDER_GOOGLE}
              customMapStyle={mapStyle}
            />}
      </Container>
    );
  }
}
