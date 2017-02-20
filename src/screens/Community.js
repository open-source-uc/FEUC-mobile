import React, { PropTypes, Component } from 'react';
import styled from 'styled-components/native';

import { ErrorBar, RichText } from '../components/';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const ScrollView = styled.ScrollView`
  padding: 18;
`;


export default class Community extends Component {
  static navigationOptions = {
    title: 'FEUC',
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: state.params ? state.params.title : 'Community',
    }),
  }

  static propTypes = {
    navigation: PropTypes.object,
  }

  static defaultProps = {
    navigation: null,
  }

  state = {
    error: null,
    content: this.props.navigation.state.params.content,
  }

  componentWillReceiveProps = (nextProps) => {
    const { navigation } = nextProps;

    if (navigation && navigation.state.params.content) {
      this.setState({ content: nextProps.navigation.state.params.content });
    }
  }

  render() {
    const { error, content } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          {content && (
            <ScrollView>
              <RichText>{content}</RichText>
            </ScrollView>
          )}
        </Container>
      </Themed>
    );
  }
}
