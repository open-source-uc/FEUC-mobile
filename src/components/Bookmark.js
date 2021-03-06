import React, { PureComponent } from "react";
import { Image, Platform } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components/native";

import { images } from "../assets/";

const Container = styled.Image`
  width: 56;
  height: ${Platform.OS === "ios" ? 95 : 105};
  resize-mode: ${Image.resizeMode.stretch};
`;

Container.defaultProps = {
  source: images.eventBookmark,
};

const Content = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 3 10;
`;

const Lead = styled.Text`
  color: ${props => props.theme.colors.A};
  background-color: transparent;
  text-align: center;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 500;
  font-size: 13;
  height: 12;
  line-height: 15;
  margin: 2 0;
`;

const Title = styled(Lead)`
  color: ${props => props.theme.colors.G};
  font-size: 25;
  font-weight: 200;
  height: ${Platform.OS === "ios" ? 20 : 25};
  line-height: ${Platform.OS === "ios" ? 25 : 24};
`;

export default class EventDate extends PureComponent {
  static Lead = Lead;
  static Title = Title;

  static propTypes = {
    children: PropTypes.any,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const { children, ...props } = this.props;

    return (
      <Container {...props}>
        <Content>
          {children}
        </Content>
      </Container>
    );
  }
}
