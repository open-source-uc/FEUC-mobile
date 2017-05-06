import React, { Component } from "react";
import { Linking } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components/native";
import noop from "lodash/noop";
import get from "lodash/get";

import { Arc, ErrorBar, Social } from "../components/";
import { fetchAbout } from "../redux/modules/about";
import Themed from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.Z};
`;

const ArcLead = styled(Arc.Lead)`
  margin-bottom: 18;
`;

const Button = styled.TouchableOpacity`
  height: 44;
  background-color: ${props => props.theme.colors.A};
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  text-align: center;
  font-family: ${props => props.theme.fonts.headers};
  color: ${props => props.theme.colors.Z};
`;

const mapStateToProps = state => state.about;

const mapDispatchToProps = {
  fetchAbout,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class About extends Component {
  static navigationOptions = {
    title: "FEUC",
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: state.params ? state.params.title : "FEUC",
    }),
  };

  static propTypes = {
    navigation: PropTypes.object,
    fetchAbout: PropTypes.func,
    content: PropTypes.object,
    error: PropTypes.object,
    bannerHeight: PropTypes.number,
  };

  static defaultProps = {
    navigation: null,
    fetchAbout: noop,
    content: null,
    error: null,
    bannerHeight: 190,
  };

  state = {
    content: this.props.content,
  };

  componentDidMount() {
    this.props.fetchAbout();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content) {
      this.setState({ content: nextProps.content });
    }
  }

  handleAttendancePress = () => {
    if (this.props.navigation) {
      this.props.navigation.navigate("Attendances");
    }
  };

  handleSocialPress = ({ url }) => {
    try {
      Linking.openURL(url);
    } catch (err) {
      alert("Hubo un problema abriendo la URL."); // eslint-disable-line
    }
  };

  render() {
    const { bannerHeight, error } = this.props;
    const { content } = this.state;

    const logo = {
      uri: get(content, "logo.secure_url"),
    };
    const bannerSource = {
      uri: get(content, "banner.secure_url"),
    };

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          {content &&
            <Arc bannerSource={bannerSource} bannerHeight={bannerHeight}>
              <Arc.ArcLayout>
                <Arc.BrandImage shadow background="Z" source={logo} />
              </Arc.ArcLayout>
              <Arc.BrandTitle>
                Conócenos
              </Arc.BrandTitle>
              <Arc.Title>
                {content.title}
              </Arc.Title>
              <ArcLead>
                {content.subtitle}
              </ArcLead>
              <Arc.Content>
                <Arc.Body>
                  {get(content, "content.full.md") || content.content.brief}
                </Arc.Body>
              </Arc.Content>
            </Arc>}
          <Social.Bar>
            {content &&
              get(content, "social", [])
                .filter(Boolean)
                .map(url => (
                  <Social
                    key={url}
                    url={url}
                    onPress={this.handleSocialPress}
                  />
                ))}
          </Social.Bar>
          <Button onPress={this.handleAttendancePress}>
            <ButtonText>
              Revisa el libro de asistencias
            </ButtonText>
          </Button>
        </Container>
      </Themed>
    );
  }
}
