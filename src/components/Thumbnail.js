import React, { PropTypes } from 'react';
import { View, Image } from 'react-native';
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


const Thumbnail = ({ size, circle, shadow, tint, source, ...props }) => (
  <ThumbnailContainer size={size} circle={circle} shadow={shadow} {...props}>
    <ThumbnailImage
      size={size}
      circle={circle}
      shadow={shadow}
      source={source}
      style={{ tintColor: tint }} // undefined is disabled
    />
  </ThumbnailContainer>
);

Thumbnail.propTypes = {
  size: PropTypes.number,
  circle: PropTypes.bool,
  shadow: PropTypes.bool,
  source: PropTypes.any.isRequired,
  tint: PropTypes.string,
  ...View.propTypes,
};

Thumbnail.defaultProps = {
  size: 65,
  circle: false,
  shadow: false,
  tint: undefined,
  elevation: 5,
};

export default Thumbnail;
