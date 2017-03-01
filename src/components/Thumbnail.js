import React, { PropTypes, PureComponent } from 'react';
import { View, Image, findNodeHandle } from 'react-native';
import { BlurView } from 'react-native-blur';
import styled from 'styled-components/native';


const ThumbnailContainer = styled.View`
  background-color: ${props => props.theme.colors[props.background] || props.theme.colors.D};
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => (props.circle ? props.size / 2 : 0)};
  shadow-color: ${props => (props.shadow ? props.theme.colors.G : 'transparent')};
  shadow-offset: 1 1;
  shadow-opacity: ${props => (props.shadow ? 0.1 : 0)};
  shadow-radius: ${props => (props.shadow ? 1.0 : 0)};
`;

const ThumbnailImage = styled.Image`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => (props.circle ? props.size / 2 : 0)};
  resize-mode: ${Image.resizeMode.cover};
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
  blurType: 'light',
  blurAmount: 4,
};

const Upper = styled.Text`
  color: ${props => props.theme.colors.white};
  background-color: transparent;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 400;
  font-size: 12;
`;

Upper.defaultProps = {
  numberOfLines: 0,
};

const Main = styled.Text`
  color: ${props => props.theme.colors.white};
  background-color: transparent;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 300;
  font-size: 22;
  line-height: 24;
`;

Main.defaultProps = Upper.defaultProps;

export default class Thumbnail extends PureComponent {
  static Upper = Upper
  static Main = Main

  static propTypes = {
    ...View.propTypes,
    size: PropTypes.number,
    circle: PropTypes.bool,
    shadow: PropTypes.bool,
    source: PropTypes.any.isRequired,
    tint: PropTypes.string,
  }

  static defaultProps = {
    size: 65,
    circle: false,
    shadow: false,
    tint: undefined,
    elevation: 5,
  }

  state = {
    viewRef: null,
  }

  render() {
    const { children, blur, size, circle, shadow, tint, source, ...props } = this.props;
    return (
      <ThumbnailContainer size={size} circle={circle} shadow={shadow} {...props}>
        <ThumbnailImage
          size={size}
          circle={circle}
          shadow={shadow}
          source={source}
          style={{ tintColor: tint }} // undefined is disabled
          innerRef={(background) => {
            this.background = background;
          }}
          onLoadEnd={() => this.setState({ viewRef: findNodeHandle(this.background) })}
        >
          {blur && <Blurred viewRef={this.state.viewRef} />}
          {children}
        </ThumbnailImage>
      </ThumbnailContainer>
    );
  }
}
