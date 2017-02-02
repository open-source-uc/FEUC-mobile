import React, { PropTypes, Component } from 'react';
import styled from 'styled-components/native';

import { ErrorBar, RichText } from '../components/';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  padding: 18;
`;


export default class AboutDetail extends Component {
  static navigationOptions = {
    title: ({ state }) => `${state.params.title}`,
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
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
      <Themed>
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
