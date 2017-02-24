import React, { PropTypes, PureComponent } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';


const Container = styled.TouchableOpacity`
  flex: 1;
  background-color: ${props => (props.theme.colors[props.color] || props.theme.colors.E)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 44;
`;

const Text = styled.Text`
  color: ${props => (props.theme.colors[props.color] || props.theme.colors.E)};
  font-size: 12;
  flex: 1;
  letter-spacing: 0.4;
`;

const Icon = styled(Ionicons)`
  color: ${props => (props.theme.colors[props.color] || props.theme.colors.E)};
  font-size: ${12 + 4};
  padding-top: 1;
  margin: ${props => (props.position === 'right' ? '0 8 0 18' : '0 18 0 8')};
  margin-right: ${props => (props.position === 'right' ? 18 : 8)};
  margin-left: ${props => (props.position === 'right' ? 8 : 18)};
`;

Icon.defaultProps = {
  name: 'ios-arrow-dropright',
};


export default class Button extends PureComponent {
  static Text = Text;
  static Icon = Icon;

  static propTypes = {
    ...Container.propTypes,
    color: PropTypes.string,
  }

  static defaultProps = {
    color: null,
  }

  render() {
    const { children, color, ...props } = this.props;
    return (
      <Container color={color} {...props}>
        {children}
        {/* {children && [].concat(children).map((child, i) => (
          React.cloneElement(child, { key: i, primary })
        ))} */}
      </Container>
    );
  }
}
