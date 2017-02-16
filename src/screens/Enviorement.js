import React, { PropTypes, Component } from 'react';
import styled from 'styled-components/native';

import { ErrorBar, TabBarIcon } from '../components/';
import Themed from '../styles';
import { defaults } from '../Navigator';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;


export default class Enviorement extends Component {
  static navigationOptions = {
    title: 'Huella de carbono',
    tabBar: {
      label: 'Huella',
      icon: props => <TabBarIcon.Enviorement {...props} />,
    },
    header: () => ({
      ...defaults.navigator.header,
    }),
  }

  static propTypes = {
    navigation: PropTypes.any,
  }

  static defaultProps = {
    navigation: null,
  }

  state = {
    error: false,
  }

  render() {
    const { error } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
        </Container>
      </Themed>
    );
  }
}
