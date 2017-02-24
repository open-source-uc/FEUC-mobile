import React, { PropTypes, PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';


const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Icon = styled(Ionicons)`
  margin: 5 18;
`;


export default class NavbarButton extends PureComponent {
  static propTypes = {
    ...TouchableOpacity.propTypes,
    name: PropTypes.any,
  }

  static defaultProps = {
    name: 'ios-home',
  }

  render() {
    const { children, name, ...props } = this.props;

    return (
      <Container {...props}>
        <Icon name={name} size={26} color="white" />
        {children}
      </Container>
    );
  }
}
