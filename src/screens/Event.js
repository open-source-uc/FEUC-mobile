import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Linking,
  Alert,
  Dimensions,
  Platform,
} from "react-native";
import PropTypes from "prop-types";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { Svg as SVG, Polygon } from "react-native-svg";
import { connect } from "react-redux";
import { denormalize } from "normalizr";
import { translate } from "react-i18next";
import styled from "styled-components/native";
import stringify from "qs/lib/stringify";
import moment from "moment";
import get from "lodash/get";
import identity from "lodash/identity";
import noop from "lodash/noop";
import startCase from "lodash/startCase";

import {
  Button,
  ErrorBar,
  Tag,
  EventDate,
  RichText,
  Social,
  Loading,
} from "../components/";
import { saveEvent, removeEvent } from "../redux/modules/events";
import * as schemas from "../schemas";
import Themed, { colors } from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.Z};
`;

const StyledParallaxScrollView = styled(ParallaxScrollView)`
  flex: 1;
  overflow: hidden;
`;

const Banner = styled.Image`
  width: ${Dimensions.get("window").width};
  background-color: ${props => props.theme.colors.F};
  resize-mode: ${Image.resizeMode.cover};
  height: ${props => props.height || 256};
`;

const BannerContentIOS = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  top: ${props => -1 * props.offset};
`;

const BannerContentAndroid = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;

const StyledSVG = styled(SVG)`
  width: ${Dimensions.get("window").width};
  height: ${props => props.height};
`;

const AbsoluteEventDate = styled(EventDate)`
  position: absolute;
  right: 18;
  bottom: 0;
`;

const ScrollView = styled.ScrollView`flex: 1;`;

const Content = styled.View`
  background-color: ${props => props.theme.colors.Z};
  padding: 0 0 28;
`;

const Row = styled.View`
  justify-content: flex-start;
  flex-direction: ${props => props.direction || "row"};
  flex-wrap: wrap;
  align-items: stretch;
  padding-vertical: ${props => (props.vertical === "fit" ? 0 : 5)};
  padding-horizontal: ${props => (props.fluid ? 0 : 18)};
  border-bottom-width: ${props =>
    props.separator ? StyleSheet.hairlineWidth : 0};
  border-bottom-color: ${props => props.theme.colors.E};
`;

const View = styled.View`
  flex: 1;
  margin-top: 8;
`;

const Ttile = styled.Text`
  color: ${props => props.theme.colors.G};
  font-family: ${props => props.theme.fonts.headers};
  font-size: 15;
  font-weight: 700;
`;

const SubTitle = styled.Text`
  font-family: ${props => props.theme.fonts.headers};
  color: ${props => props.theme.colors.E};
  font-size: 13;
  font-weight: 300;
  margin-bottom: 12;
`;

const AboutTitle = styled.Text`
  color: ${props => props.theme.colors.A};
  font-family: ${props => props.theme.fonts.headers};
  font-size: 12;
  font-weight: 600;
  margin: 10 0 0 0;
`;

// const RichText = styled(RichText)`
//   font-family: ${props => props.theme.fonts.body};
//   color: ${props => props.theme.colors.F};
//   font-size: 12;
//   font-weight: 400;
//   line-height: 19;
// `;

const ActionText = styled.Text`
  flex: 1;
  color: ${props => props.theme.colors[props.color] || props.theme.colors.F};
  font-family: ${props => props.theme.fonts.main};
  padding-left: 3;
`;

ActionText.defaultProps = {
  numberOfLines: 0,
};

const mapStateToProps = ({ nav, entities, events }) => {
  const id = get(nav, ["routes", nav.index, "params", "_id"]);
  return {
    event: id ? denormalize(id, schemas.event, entities) : null,
    isSaved: events.saved.includes(id),
  };
};

const mapDispatchToProps = {
  saveEvent,
  removeEvent,
};

@connect(mapStateToProps, mapDispatchToProps)
@translate()
export default class Event extends Component {
  static navigationOptions = {
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: get(state, "params.title", "Evento").toUpperCase(),
    }),
  };

  static propTypes = {
    // navigation: PropTypes.any,
    t: PropTypes.func,
    saveEvent: PropTypes.func,
    removeEvent: PropTypes.func,
    event: PropTypes.object,
    isSaved: PropTypes.bool,
    error: PropTypes.object,
    bannerHeight: PropTypes.number,
    triangleHeight: PropTypes.number,
  };

  static defaultProps = {
    // navigation: null,
    t: identity,
    saveEvent: noop,
    removeEvent: noop,
    event: null,
    isSaved: false,
    error: null,
    bannerHeight: 256,
    triangleHeight: 40,
  };

  state = {
    event: this.props.event,
    isSaved: this.props.isSaved,
  };

  componentWillReceiveProps(nextProps) {
    const { event, isSaved } = nextProps;
    if (event) {
      this.setState({ event, isSaved });
    }
  }

  alertError = (error, url) => {
    Alert.alert("Hubo un error abriendo la URL:", String(url));
  };

  formatTimeRange = event => {
    const start = moment(get(event, "temporality.start")); // required
    const end = moment(get(event, "temporality.end")); // required

    if (start.isSame(end, "day")) {
      return `${start.format("HH:mm")} - ${end.format("HH:mm")}`;
    } else {
      const days = end.diff(start, "days") + 1;
      return `${start.format("HH:mm")} (${days} días)`;
    }
  };

  handleToogleCalendar = () => {
    const { event, isSaved } = this.state;
    if (isSaved) {
      this.props.removeEvent(event._id);
    } else {
      this.props.saveEvent(event._id);
    }
  };

  handleSocialPress = async ({ url }) => {
    try {
      Linking.openURL(url);
    } catch (err) {
      this.alertError(err);
    }
  };

  handleAdmissionPress = async () => {
    const url = this.state.event.admission.url;
    try {
      if (url) Linking.openURL(url);
    } catch (err) {
      this.alertError(err);
    }
  };

  handleLocationPress = async () => {
    const { event } = this.state;

    const parts = ["street1", "suburb", "country"];
    const got = parts
      .map(part => get(event, ["location", part]))
      .filter(Boolean);
    if (got.length === 0) return;

    // TODO: Open in native app
    const query = stringify({ q: got.join(", ") });
    const url = `http://maps.google.com/?${query}`;

    try {
      Linking.openURL(url);
    } catch (err) {
      this.alertError(err);
    }
  };

  renderBackground = children => {
    const { bannerHeight } = this.props;
    const { event } = this.state;

    return (
      <Banner
        source={{ uri: get(event, "banner.secure_url") }}
        height={bannerHeight}
      >
        {children}
      </Banner>
    );
  };

  renderLocation = event => {
    const parts = ["street1", "suburb"];
    const got = parts
      .map(part => get(event, ["location", part]))
      .filter(Boolean);
    if (got.length) {
      return got.join(", ");
    } else {
      return null;
    }
  };

  renderContent = () => {
    const { t } = this.props;
    const { event, isSaved } = this.state;
    const location = this.renderLocation(event);

    return (
      <Content>
        <Row>
          <View>
            <Ttile>
              {event.title.toUpperCase()}
            </Ttile>
            <SubTitle>
              {event.subtitle}
            </SubTitle>
          </View>
        </Row>
        <Row fluid separator vertical="fit">
          <Button color="Z">
            <Button.Icon color="A" name="ios-time-outline" />
            <Button.Text color="F">
              {this.formatTimeRange(event)}
            </Button.Text>
          </Button>
          <Button
            color={isSaved ? "Z" : "A"}
            onPress={this.handleToogleCalendar}
          >
            <Button.Icon color={isSaved ? "A" : "Z"} name="ios-calendar" />
            <Button.Text color={isSaved ? "A" : "Z"}>
              {isSaved ? "Quitar de agenda" : "Agregar a agenda"}
            </Button.Text>
          </Button>
        </Row>
        <Row fluid separator vertical="fit">
          <Button color="Z" onPress={this.handleLocationPress}>
            <Button.Icon color="A" name="ios-map-outline" />
            <Button.Text color="F">
              {location || "Lugar por definir"}
            </Button.Text>
            {location &&
              <Button.Icon
                color="A"
                position="right"
                name="ios-arrow-forward"
              />}
          </Button>
        </Row>
        <Row fluid separator vertical="fit">
          <Button color="Z" onPress={this.handleAdmissionPress}>
            <Button.Icon color="A" name="ios-barcode-outline" />
            <Button.Text color="F">
              {event.admission.note ||
                t(
                  ["events", "admission", event.admission.ticket].join(".")
                ).toUpperCase()}
            </Button.Text>
            <Button.Icon color="A" position="right" name="ios-arrow-forward" />
          </Button>
        </Row>
        <Row>
          <AboutTitle>Sobre el evento</AboutTitle>
        </Row>
        <Row>
          <RichText>
            {get(event, "description.full.md") ||
              get(event, "description.brief") ||
              "Sin descripción."}
          </RichText>
        </Row>
        <Row>
          {event.tags &&
            event.tags.filter(Boolean).map(tag =>
              <Tag key={tag._id}>
                {tag.name}
              </Tag>
            )}
        </Row>
        <Row fluid fit direction="column">
          {get(event, "social", []).filter(Boolean).map(url => {
            const obj = Social.parse(url);
            return (
              <Social key={url} url={url} onPress={this.handleSocialPress}>
                <ActionText color="Z">
                  Abrir en {startCase(obj.network)}
                </ActionText>
                <Button.Icon
                  color="Z"
                  position="left"
                  name="ios-arrow-forward"
                />
              </Social>
            );
          })}
        </Row>
      </Content>
    );
  };

  render() {
    const { error, bannerHeight, triangleHeight } = this.props;
    const { event } = this.state;

    // Triangle dimensions
    const width = Dimensions.get("window").width;
    const height = triangleHeight;

    const points = [[0, height], [width, height], [width, 0]];

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          {!event && <Loading />}
          {event &&
            Platform.OS === "ios" &&
            <StyledParallaxScrollView
              contentBackgroundColor={colors.white}
              renderBackground={this.renderBackground}
              parallaxHeaderHeight={bannerHeight}
            >
              <BannerContentIOS offset={triangleHeight}>
                <StyledSVG height={height}>
                  <Polygon
                    points={points.reduce(
                      (string, [x, y]) => `${string} ${x},${y}`,
                      ""
                    )}
                    fill={colors.Z}
                  />
                </StyledSVG>
                <AbsoluteEventDate date={new Date(event.temporality.start)} />
              </BannerContentIOS>
              {this.renderContent()}
            </StyledParallaxScrollView>}
          {event &&
            Platform.OS === "android" &&
            <ScrollView>
              {this.renderBackground(
                <BannerContentAndroid offset={bannerHeight}>
                  <StyledSVG height={height}>
                    <Polygon
                      points={points.reduce(
                        (string, [x, y]) => `${string} ${x},${y}`,
                        ""
                      )}
                      fill={colors.Z}
                    />
                  </StyledSVG>
                  <AbsoluteEventDate date={new Date(event.temporality.start)} />
                </BannerContentAndroid>
              )}
              {this.renderContent()}
            </ScrollView>}
        </Container>
      </Themed>
    );
  }
}
