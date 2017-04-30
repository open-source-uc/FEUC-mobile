import React, { PureComponent } from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Icon = styled(Ionicons)`
  color: white;
  margin: 5 18;
`;

Icon.defaultProps = {
  size: 26,
};

export default class NavbarButton extends PureComponent {
  static Icon = Icon;

  static propTypes = TouchableOpacity.propTypes;

  render() {
    return <Container {...this.props} />;
  }
}
