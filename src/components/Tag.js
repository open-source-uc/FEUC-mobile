import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import isString from "lodash/isString";

const Container = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.E};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5 10;
  margin-right: 3;
  margin-bottom: 3;
`;

const Name = styled.Text`
  color: ${props => props.theme.colors.D};
  font-size: 7;
  font-weight: bold;
`;

export default class Tag extends PureComponent {
  static Name = Name;

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
        {isString(children)
          ? <Name>
              {children.toUpperCase()}
            </Name>
          : children}
      </Container>
    );
  }
}
