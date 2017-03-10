import React, { PropTypes, PureComponent } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';


const Container = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.Z};
  margin: 4 4;
  padding: 4 7;
  height: 24;
  flex-direction: row;
  align-items: center;
`;

const Text = styled.Text`
  color: ${props => props.theme.colors.B};
  font-size: 10;
  font-weight: 400;
`;

const Close = styled(Ionicons)`
  color: ${props => props.theme.colors.B};
  padding-top: 3;
  margin-left: 4;
  margin-right: 1;
`;

Close.defaultProps = {
  name: 'ios-close',
};


export default class SearchTag extends PureComponent {
  static Text = Text;
  static Close = Close;

  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <Container {...props}>
        <Text>
          {children}
        </Text>
        <Close />
      </Container>
    );
  }
}
