import React, { PropTypes, Component } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import styled from 'styled-components/native';
import get from 'lodash/get';

import { Arc, ErrorBar, Social } from '../components/';
import * as schemas from '../schemas';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.Z};
`;

const ArcLead = styled(Arc.Lead)`
  margin-bottom: 18;
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
    bannerHeight: PropTypes.number,
  }

  static defaultProps = {
    // navigation: null,
    initiative: null,
    error: null,
    bannerHeight: 190,
  }

  state = {
    initiative: this.props.initiative,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initiative) {
      this.setState({ initiative: nextProps.initiative });
    }
  }

  handleSocialPress = ({ url }) => {
    try {
      Linking.openURL(url);
    } catch (err) {
      alert('Hubo un problema abriendo la URL.') // eslint-disable-line
    }
  }

  render() {
    const { bannerHeight, error } = this.props;
    const { initiative } = this.state;

    const initiativeSource = {
      uri: get(initiative, 'image.secure_url'),
    };
    const bannerSource = {
      uri: get(initiative, 'banner.secure_url'),
    };

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          {initiative && (
            <Arc bannerSource={bannerSource} bannerHeight={bannerHeight}>
              <Arc.ArcLayout>
                <Arc.BrandImage shadow background="Z" source={initiativeSource} />
              </Arc.ArcLayout>
              <Arc.BrandTitle>
                Iniciativa UC
              </Arc.BrandTitle>
              <Arc.Title>
                {initiative.name}
              </Arc.Title>
              {initiative.lead && (
                <ArcLead>
                  {initiative.lead}
                </ArcLead>)
              }
              <Arc.Content>
                <Arc.Body>
                  {get(initiative, 'description.full.md') || initiative.description.brief}
                </Arc.Body>
              </Arc.Content>
            </Arc>
          )}
          <Social.Bar>
            {initiative && get(initiative, 'social', []).filter(Boolean).map(url => (
              <Social key={url} url={url} onPress={this.handleSocialPress} />
            ))}
          </Social.Bar>
        </Container>
      </Themed>
    );
  }
}
