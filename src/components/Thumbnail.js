import React, { PureComponent } from "react";
import { View, Image, Platform } from "react-native";
import PropTypes from "prop-types";
import { BlurView } from "react-native-blur";
import styled from "styled-components/native";

const ThumbnailContainer = styled.View`
  background-color: ${props =>
    props.theme.colors[props.background] ||
    props.background ||
    props.theme.colors.D};
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => (props.circle ? props.size / 2 : 0)};
  shadow-color: ${props =>
    props.shadow ? props.theme.colors.G : "transparent"};
  shadow-offset: 1 1;
  shadow-opacity: ${props => (props.shadow ? 0.1 : 0)};
  shadow-radius: ${props => (props.shadow ? 1.0 : 0)};
`;

const ThumbnailImage = styled.Image`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => (props.circle ? props.size / 2 : 0)};
  resize-mode: ${props => props.mode};
  justify-content: center;
  align-items: center;
`;

const Blurred = styled(BlurView)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

Blurred.defaultProps = {
  blurType: "light",
  blurAmount: 4,
};

const Opaque = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  background-color: black;
  opacity: 0.3;
`;

const Upper = styled.Text`
  color: ${props => props.theme.colors.white};
  background-color: transparent;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 400;
  font-size: ${props => (props.small ? 10 : 12)};
`;

Upper.defaultProps = {
  numberOfLines: 0,
};

const Main = styled.Text`
  color: ${props => props.theme.colors.white};
  background-color: transparent;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 300;
  font-size: ${props => (props.small ? 18 : 22)};
  line-height: 24;
`;

Main.defaultProps = Upper.defaultProps;

export default class Thumbnail extends PureComponent {
  static Upper = Upper;
  static Main = Main;

  static propTypes = {
    ...View.propTypes,
    size: PropTypes.number,
    circle: PropTypes.bool,
    shadow: PropTypes.bool,
    source: PropTypes.any.isRequired,
    tint: PropTypes.string,
    mode: PropTypes.any,
  };

  static defaultProps = {
    size: 65,
    circle: false,
    shadow: false,
    tint: undefined,
    elevation: 5,
    mode: Image.resizeMode.cover,
  };

  state = {};

  render() {
    const {
      children,
      blur,
      size,
      circle,
      shadow,
      tint,
      source,
      mode,
      ...props
    } = this.props;

    if (Platform.OS === "ios") {
      return (
        <ThumbnailContainer
          size={size}
          circle={circle}
          shadow={shadow}
          {...props}
        >
          <ThumbnailImage
            source={source}
            mode={mode}
            size={size}
            circle={circle}
            shadow={shadow}
            style={{ tintColor: tint }} // undefined is disabled
          >
            {blur && <Blurred />}
            {children}
          </ThumbnailImage>
        </ThumbnailContainer>
      );
    } else {
      return (
        <ThumbnailImage
          source={source}
          mode={mode}
          size={size}
          circle={circle}
          shadow={shadow}
          style={{ tintColor: tint }} // undefined is disabled
          {...props}
        >
          {blur && <Opaque />}
          {children}
        </ThumbnailImage>
      );
    }
  }
}
