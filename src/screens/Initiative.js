import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import styled from 'styled-components/native';
import get from 'lodash/get';

import { ErrorBar, RichText } from '../components/';
import * as schemas from '../schemas';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const ScrollView = styled.ScrollView`
  padding: 18;
`;


const mapStateToProps = ({ nav, entities }) => {
  const id = get(nav, ['routes', nav.index, 'params', 'initiativeId']);
  return {
    initiative: id ? denormalize(id, schemas.initiative, entities) : null,
  };
};

const mapDispatchToProps = null;

@connect(mapStateToProps, mapDispatchToProps)
export default class Initiative extends Component {
  static navigationOptions = {
    title: 'FEUC',
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: state.params ? state.params.title : 'Initiative',
    }),
  }

  static propTypes = {
    // navigation: PropTypes.object,
    initiative: PropTypes.object,
    error: PropTypes.object,
  }

  static defaultProps = {
    // navigation: null,
    initiative: null,
    error: null,
  }

  state = {
    initiative: this.props.initiative,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initiative) {
      this.setState({ initiative: nextProps.initiative });
    }
  }

  render() {
    const { error } = this.props;
    const { initiative } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          {initiative && (
            <ScrollView>
              <RichText>{JSON.stringify(initiative, 2, null)}</RichText>
            </ScrollView>
          )}
        </Container>
      </Themed>
    );
  }
}
