import React, { PureComponent } from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components/native";

import { images } from "../assets";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding-left: ${() => (Platform.OS === "ios" ? 0 : 24)};
`;

const Logo = styled.Image`
  height: 34;
  width: 60;
  background-color: transparent;
  margin-bottom: 5;
`;

export default class Loading extends PureComponent {
  static propTypes = {
    source: PropTypes.any,
  };

  static defaultProps = {
    source: images.logo.transparent,
  };

  render() {
    const { source, ...props } = this.props;
    return (
      <Container {...props}>
        <Logo source={source} />
      </Container>
    );
  }
}
