import React, { PropTypes, PureComponent } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styled from 'styled-components/native';
import socialUrl from 'social-url';
import noop from 'lodash/noop';


const Container = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors[props.network] || props.theme.colors.B};
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 14;
  height: 44;
`;

const Bar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
`;

const Icon = styled(EvilIcons)`
  color: ${props => props.theme.colors.white};
  font-size: 27;
`;


export default class Social extends PureComponent {
  static Bar = Bar

  static propTypes = {
    children: PropTypes.node,
    url: PropTypes.string,
    defaultIcon: PropTypes.string,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    children: null,
    url: null,
    defaultIcon: 'link',
    onPress: noop,
  }

  static parse = (url) => {
    try {
      const parsed = socialUrl.parse(url);
      return {
        url,
        network: (parsed.network || '').toLowerCase(),
        user: (parsed.user || '').toLowerCase(),
      };
    } catch (err) {
      return { url, network: null, user: null };
    }
  }

  state = Social.parse(this.props.url)

  componentWillReceiveProps(nextProps) {
    this.setState(Social.parse(nextProps.url));
  }

  handlePress = () => {
    this.props.onPress(this.state);
  }

  render() {
    const { defaultIcon, children, ...props } = this.props;
    const { network } = this.state;
    return (
      <Container network={network} {...props} onPress={this.handlePress}>
        <Icon name={network ? `sc-${network}` : defaultIcon} />
        {children}
      </Container>
    );
  }
}
