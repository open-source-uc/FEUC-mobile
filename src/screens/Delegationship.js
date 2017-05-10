import React, { Component } from "react";
import { Linking } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { denormalize } from "normalizr";
import styled from "styled-components/native";
import get from "lodash/get";

import { Arc, ErrorBar, Social } from "../components/";
import * as schemas from "../schemas";
import Themed from "../styles";
import { images } from "../assets/";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.Z};
`;

const ArcLead = styled(Arc.Lead)`
  margin-bottom: 18;
`;

const mapStateToProps = ({ nav, entities }) => {
  const id = get(nav, ["routes", nav.index, "params", "_id"]);
  return {
    delegationship: id
      ? denormalize(id, schemas.delegationship, entities)
      : null,
  };
};

const mapDispatchToProps = null;

@connect(mapStateToProps, mapDispatchToProps)
export default class Delegationship extends Component {
  static navigationOptions = {
    title: "FEUC",
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: state.params ? state.params.title : "Delegationship",
    }),
  };

  static propTypes = {
    // navigation: PropTypes.object,
    delegationship: PropTypes.object,
    error: PropTypes.object,
    bannerHeight: PropTypes.number,
  };

  static defaultProps = {
    // navigation: null,
    delegationship: null,
    error: null,
    bannerHeight: 190,
  };

  state = {
    delegationship: this.props.delegationship,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.delegationship) {
      this.setState({ delegationship: nextProps.delegationship });
    }
  }

  handleSocialPress = ({ url }) => {
    try {
      Linking.openURL(url);
    } catch (err) {
      alert("Hubo un problema abriendo la URL."); // eslint-disable-line
    }
  };

  render() {
    const { bannerHeight, error } = this.props;
    const { delegationship } = this.state;

    const delegationshipSource = images.logo.square;
    const bannerSource = {
      uri: get(delegationship, "banner.secure_url"),
    };

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          {delegationship &&
            <Arc bannerSource={bannerSource} bannerHeight={bannerHeight}>
              <Arc.ArcLayout>
                <Arc.BrandImage
                  shadow
                  background="Z"
                  tint={delegationship.color}
                  source={delegationshipSource}
                />
              </Arc.ArcLayout>
              <Arc.BrandTitle>
                Vocalías
              </Arc.BrandTitle>
              <Arc.Title>
                {delegationship.name}
              </Arc.Title>
              <ArcLead>
                {delegationship.lead}
              </ArcLead>
              <Arc.Content>
                <Arc.Body>
                  {get(delegationship, "description.full.md") ||
                    delegationship.description.brief}
                </Arc.Body>
              </Arc.Content>
            </Arc>}
          <Social.Bar>
            {delegationship &&
              get(delegationship, "social", [])
                .filter(Boolean)
                .map(url => (
                  <Social
                    key={url}
                    url={url}
                    onPress={this.handleSocialPress}
                  />
                ))}
          </Social.Bar>
        </Container>
      </Themed>
    );
  }
}
