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
  const id = get(nav, ['routes', nav.index, 'params', 'delegationshipId']);
  return {
    delegationship: id ? denormalize(id, schemas.delegationship, entities) : null,
  };
};

const mapDispatchToProps = null;

@connect(mapStateToProps, mapDispatchToProps)
export default class Delegationship extends Component {
  static navigationOptions = {
    title: 'FEUC',
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: state.params ? state.params.title : 'Delegationship',
    }),
  }

  static propTypes = {
    // navigation: PropTypes.object,
    delegationship: PropTypes.object,
    error: PropTypes.object,
  }

  static defaultProps = {
    // navigation: null,
    delegationship: null,
    error: null,
  }

  state = {
    delegationship: this.props.delegationship,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.delegationship) {
      this.setState({ delegationship: nextProps.delegationship });
    }
  }

  render() {
    const { error } = this.props;
    const { delegationship } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          {delegationship && (
            <ScrollView>
              <RichText>{JSON.stringify(delegationship, 2, null)}</RichText>
            </ScrollView>
          )}
        </Container>
      </Themed>
    );
  }
}
