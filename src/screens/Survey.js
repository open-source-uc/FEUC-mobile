import React, { Component } from "react";
import { Linking } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { denormalize } from "normalizr";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import get from "lodash/get";
import range from "lodash/range";
import toFinite from "lodash/toFinite";
import noop from "lodash/noop";

import { Arc, ErrorBar } from "../components/";
import { selectSurveyOption } from "../redux/modules/surveys";
import * as schemas from "../schemas";
import Themed from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.Z};
`;

const Buttons = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 7 10 10;
  flex-wrap: wrap;
`;

const AboutTitle = styled.Text`
  color: ${props => props.theme.colors.A};
  font-family: ${props => props.theme.fonts.headers};
  font-size: 12;
  font-weight: 600;
`;

const Touchable = styled.TouchableOpacity`
  align-items: center;
  height: 98;
`;

const Circle = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color || "white"};
  border-radius: ${props => props.size / 2};
  border-width: 2;
  border-color: ${props => props.color || props.theme.colors.E};
  height: ${props => props.size};
  width: ${props => props.size};
  margin-left: 14;
  margin-right: 14;
`;

Circle.defaultProps = {
  size: 52,
};

const Description = styled.Text`
  color: ${props => props.theme.colors.E};
  font-family: ${props => props.theme.fonts.headers};
  font-weight: bold;
  font-size: 9;
  text-align: center;
  margin-top: 10;
  max-width: 75;
`;

const Icon = styled(Ionicons)`
  color: ${props => (props.selected ? props.theme.colors.Z : props.theme.colors.E)};
  font-size: 24;
  padding-top: 2;
`;

const Option = ({ selected, icon, color, text, ...props }) => (
  <Touchable {...props}>
    <Circle color={selected ? color : "white"}>
      <Icon name={"ios-" + icon} selected={selected} />
    </Circle>
    <Description>
      {text && text.toUpperCase()}
    </Description>
  </Touchable>
);

Option.propTypes = {
  selected: PropTypes.bool,
  icon: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
};

const More = styled.TouchableOpacity`
  height: 44;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const MoreText = styled.Text`
  font-size: 14;
  font-weight: bold;
  color: ${props => props.theme.colors.B};
`;

const mapStateToProps = ({ nav, entities, surveys }) => {
  const id = get(nav, ["routes", nav.index, "params", "_id"]);
  return {
    survey: id ? denormalize(id, schemas.survey, entities) : null,
    selected: surveys.selected[id],
    selecting: surveys.selecting[id],
    error: surveys.errors[id],
  };
};

const mapDispatchToProps = {
  selectSurveyOption,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Survey extends Component {
  static navigationOptions = {
    title: "FEUC",
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: state.params ? state.params.title : "Encuesta",
    }),
  };

  static propTypes = {
    survey: PropTypes.object,
    selected: PropTypes.object,
    selecting: PropTypes.bool,
    selectSurveyOption: PropTypes.func,
    error: PropTypes.object,
    bannerHeight: PropTypes.number,
  };

  static defaultProps = {
    survey: null,
    selected: null,
    selecting: false,
    selectSurveyOption: noop,
    error: null,
    bannerHeight: 190,
  };

  state = {
    survey: this.props.survey,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.survey) {
      this.setState({ survey: nextProps.survey });
    }
  }

  handleOptionSelection = number => {
    const { survey } = this.state;
    this.props.selectSurveyOption(survey._id, number); // vote = number
  };

  handleMorePress = () => {
    try {
      Linking.openURL(this.state.survey.url);
    } catch (err) {
      alert("Hubo un problema abriendo la URL."); // eslint-disable-line
    }
  };

  render() {
    const { error } = this.props;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          {this.renderContent()}
        </Container>
      </Themed>
    );
  }

  renderContent() {
    const { bannerHeight, selected, selecting } = this.props;
    const { survey } = this.state;

    if (!survey) return null;

    const bannerSource = {
      uri: get(survey, "banner.secure_url"),
    };

    const voted = String(get(selected, "vote", ""));
    const options = range(1, toFinite(survey.alternatives) + 1)
      .map(String)
      .map(opt => ({
        ...survey.options[opt],
        selected: opt === voted,
      }))
      .filter(Boolean);

    return (
      <Arc bannerSource={bannerSource} bannerHeight={bannerHeight}>
        <Arc.ArcLayout>
          {/* <Arc.BrandImage shadow background="Z" source={surveySource} /> */}
        </Arc.ArcLayout>
        <Arc.BrandTitle>
          {selecting ? "Cargando..." : "Pregunta del día"}
        </Arc.BrandTitle>
        <Arc.Title>
          {survey.title}
        </Arc.Title>
        <Arc.Lead>
          Publicado el {moment(survey.createdAt).format("DD/MM/YYYY")}
        </Arc.Lead>
        <Arc.Content>
          <Buttons>
            {options.map((opt, i) => (
              <Option
                key={i}
                {...opt}
                onPress={() => this.handleOptionSelection(i + 1)}
              />
            ))}
          </Buttons>
          <AboutTitle>
            Sobre la pregunta
          </AboutTitle>
          <Arc.Body>
            {get(survey, "description.full.md") || survey.description.brief}
          </Arc.Body>
          {survey.url &&
            <More onPress={this.handleMorePress}>
              <MoreText>
                Ver más información
              </MoreText>
            </More>}
        </Arc.Content>
      </Arc>
    );
  }
}
