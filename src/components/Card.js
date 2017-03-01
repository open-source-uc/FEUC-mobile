import React, { PureComponent } from 'react';
import { Dimensions, Image } from 'react-native';
import styled from 'styled-components/native';

import EventDate from './EventDate';


const Container = styled.View`
  background-color: ${props => props.theme.colors.Z};
  width: ${() => Dimensions.get('window').width * 0.75};
  border-radius: 10;
  flex: 1;
  overflow: hidden;
  shadow-color: ${props => props.theme.colors.G};
  shadow-offset: 2 2;
  shadow-opacity: 0.3;
  shadow-radius: 1.2;
`;

const Touchable = styled.TouchableOpacity`
  border-top-left-radius: 10;
  border-top-right-radius: 10;
  background-color: ${props => props.theme.colors.D};
  flex: 7;
`;

Touchable.defaultProps = {
  activeOpacity: 0.8,
};

const CoverImage = styled.Image`
  flex: 1;
  resize-mode: ${Image.resizeMode.cover};
  border-top-left-radius: 10;
  border-top-right-radius: 10;
`;

const Cover = ({ children, source, ...props }) => (
  <Touchable {...props}>
    <CoverImage source={source}>
      {children}
    </CoverImage>
  </Touchable>
);

Cover.propTypes = Image.propTypes;

const AbsoluteEventDate = styled(EventDate)`
  position: absolute;
  right: 12;
  top: -4;
`;

const Bottom = styled.View`
  flex: 3;
`;


export default class Card extends PureComponent {
  static Cover = Cover;
  static Bottom = Bottom;
  static EventDate = AbsoluteEventDate;

  render() {
    return (
      <Container {...this.props} />
    );
  }
}
