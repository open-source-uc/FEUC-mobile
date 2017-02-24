import React, { PropTypes, PureComponent } from 'react';
import styled from 'styled-components/native';


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
  render() {
    const { name, ...props } = this.props;
    return (
      <Container {...props}>
        <Name>{name.toUpperCase()}</Name>
      </Container>
    );
  }
}
