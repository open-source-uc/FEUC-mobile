import React, { PropTypes } from 'react';
import { View, Image } from 'react-native';
import { BlurView } from 'react-native-blur';
import styled from 'styled-components/native';


const ThumbnailContainer = styled.View`
  background-color: ${props => props.theme.colors[props.background] || props.theme.colors.D};
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => (props.circle ? props.size / 2 : 0)};
  shadow-color: ${props => props.theme.colors.G};
  shadow-offset: 1 1;
  shadow-opacity: ${props => (props.shadow ? 0.1 : 0)};
  shadow-radius: 1.0;
`;

const ThumbnailImage = styled.Image`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => (props.circle ? props.size / 2 : 0)};
  resize-mode: ${Image.resizeMode.contain};
`;

const Blurred = styled(BlurView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

Blurred.defaultProps = {
  blurType: 'light',
  blurAmount: 10,
};

const Upper = styled.Text`
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 400;
  font-size: 12;
`;

Upper.defaultProps = {
  numberOfLines: 0,
};

const Main = styled.Text`
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 300;
  font-size: 22;
  line-height: 24;
`;

Main.defaultProps = Upper.defaultProps;


const Thumbnail = ({ children, blur, size, circle, shadow, tint, source, ...props }) => (
  <ThumbnailContainer size={size} circle={circle} shadow={shadow} {...props}>
    <ThumbnailImage
      size={size}
      circle={circle}
      shadow={shadow}
      source={source}
      style={{ tintColor: tint }} // undefined is disabled
    >
      {blur ? (
        <Blurred>
          {children}
        </Blurred>
      ) : children}
    </ThumbnailImage>
  </ThumbnailContainer>
);

Thumbnail.Upper = Upper;
Thumbnail.Main = Main;

Thumbnail.propTypes = {
  ...View.propTypes,
  size: PropTypes.number,
  circle: PropTypes.bool,
  shadow: PropTypes.bool,
  source: PropTypes.any.isRequired,
  tint: PropTypes.string,
};

Thumbnail.defaultProps = {
  size: 65,
  circle: false,
  shadow: false,
  tint: undefined,
  elevation: 5,
};

export default Thumbnail;
