import React, { PropTypes, Component } from 'react';
import { StyleSheet, Image, Linking, Alert, Dimensions } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Svg as SVG, Polygon } from 'react-native-svg';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { translate } from 'react-i18next';
import styled from 'styled-components/native';
import qs from 'qs';
import moment from 'moment';
import get from 'lodash/get';
import identity from 'lodash/identity';
import startCase from 'lodash/startCase';

import { Button, ErrorBar, Tag, EventDate, RichText, Social, Loading } from '../components/';
import * as schemas from '../schemas';
import Themed, { colors } from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.Z};
`;

const StyledParallaxScrollView = styled(ParallaxScrollView)`
  flex: 1;
  overflow: hidden;
`;

const Banner = styled.Image`
  width: ${Dimensions.get('window').width};
  background-color: ${props => props.theme.colors.F};
  resize-mode: ${Image.resizeMode.cover};
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: ${props => props.height || 256};
`;

const BannerContent = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  top: ${props => -1 * props.offset};
`;

const StyledSVG = styled(SVG)`
  width: ${Dimensions.get('window').width};
  height: ${props => props.height};
`;

const AbsoluteEventDate = styled(EventDate)`
  position: absolute;
  right: 18;
  bottom: 0;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

ScrollView.defaultProps = {
  contentContainerStyle: { paddingBottom: 24 },
};

const Content = styled.View`
  background-color: ${props => props.theme.colors.Z};
  padding: 0 0 28;
`;

const Row = styled.View`
  justify-content: flex-start;
  flex-direction: ${props => props.direction || 'row'};
  flex-wrap: wrap;
  align-items: stretch;
  padding-vertical: ${props => (props.vertical === 'fit' ? 0 : 5)};
  padding-horizontal: ${props => (props.fluid ? 0 : 18)};
  border-bottom-width: ${props => (props.separator ? StyleSheet.hairlineWidth : 0)};
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
`;

const AboutTitle = styled.Text`
  color: ${props => props.theme.colors.A};
  font-family: ${props => props.theme.fonts.headers};
  font-size: 12;
  font-weight: 600;
  margin: 10 0 0 0;
`;

const AboutText = styled(RichText)`
  font-family: ${props => props.theme.fonts.body};
  color: ${props => props.theme.colors.F};
  font-size: 12;
  font-weight: 400;
  line-height: 19;
`;

const ActionText = styled.Text`
  flex: 1;
  color: ${props => props.theme.colors[props.color] || props.theme.colors.F};
  font-family: ${props => props.theme.fonts.main};
  padding-left: 3;
`;

ActionText.defaultProps = {
  numberOfLines: 0,
};


const mapStateToProps = ({ nav, entities }) => {
  const id = get(nav, ['routes', nav.index, 'params', 'eventId']);
  return {
    event: id ? denormalize(id, schemas.event, entities) : null,
  };
};

const mapDispatchToProps = null;

@connect(mapStateToProps, mapDispatchToProps)
@translate()
export default class Event extends Component {
  static navigationOptions = {
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: get(state, 'params.title', 'Evento').toUpperCase(),
    }),
  }

  static propTypes = {
    // navigation: PropTypes.any,
    t: PropTypes.func,
    event: PropTypes.object,
    error: PropTypes.object,
    bannerHeight: PropTypes.number,
    triangleHeight: PropTypes.number,
  }

  static defaultProps = {
    // navigation: null,
    t: identity,
    event: null,
    error: null,
    bannerHeight: 256,
    triangleHeight: 40,
  }

  state = {
    event: this.props.event,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event) {
      this.setState({ event: nextProps.event });
    }
  }

  alertError = (error, url) => {
    Alert.alert('Hubo un error abriendo la URL:', String(url));
  }

  formatTimeRange = (event) => {
    const start = moment(get(event, 'temporality.start')); // required
    const end = moment(get(event, 'temporality.end')); // required

    if (start.isSame(end, 'day')) {
      return `${start.format('HH:mm')} - ${end.format('HH:mm')}`;
    } else {
      const days = end.diff(start, 'days') + 1;
      return `${start.format('HH:mm')} (${days} días)`;
    }
  }

  handleToogleCalendar = () => {

  }

  handleSocialPress = async ({ url }) => {
    try {
      Linking.openURL(url);
    } catch (err) {
      this.alertError(err);
    }
  }

  handleAdmissionPress = async () => {
    const url = this.state.event.admission.url;
    try {
      Linking.openURL(url);
    } catch (err) {
      this.alertError(err);
    }
  }

  handleLocationPress = async () => {
    const { event } = this.state;
    const parts = ['street1', 'suburb', 'country'];
    const got = parts.map(part => get(event, ['location', part])).filter(Boolean);

    if (!location) return;

    // TODO: Open in native app
    const query = qs.stringify({ q: got.join(', ') });
    const url = `http://maps.google.com/?${query}`;

    try {
      Linking.openURL(url);
    } catch (err) {
      this.alertError(err);
    }
  }

  renderBackground = () => {
    const { bannerHeight } = this.props;
    const { event } = this.state;

    return (
      <Banner source={{ uri: get(event, 'banner.secure_url') }} height={bannerHeight} />
    );
  }

  renderLocation = (event) => {
    const parts = ['street1', 'suburb'];
    const got = parts.map(part => get(event, ['location', part])).filter(Boolean);
    if (got.length) {
      return got.join(', ');
    } else {
      return null;
    }
  }

  render() {
    const { t, error, bannerHeight, triangleHeight } = this.props;
    const { event, addded } = this.state;

    // Triangle dimensions
    const width = Dimensions.get('window').width;
    const height = triangleHeight;

    const points = [
      [0, height],
      [width, height],
      [width, 0],
    ];

    const location = this.renderLocation(event);

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          {!event && (
            <Loading />
          )}
          {event && (
            <StyledParallaxScrollView
              contentBackgroundColor={colors.white}
              renderBackground={this.renderBackground}
              parallaxHeaderHeight={bannerHeight}
            >
              <BannerContent offset={triangleHeight}>
                <StyledSVG height={height}>
                  <Polygon
                    points={points.reduce((string, [x, y]) => `${string} ${x},${y}`, '')}
                    fill={colors.Z}
                  />
                </StyledSVG>
                <AbsoluteEventDate date={new Date(event.temporality.start)} />
              </BannerContent>
              <Content>
                <Row>
                  <View>
                    <Ttile>{event.title.toUpperCase()}</Ttile>
                    <SubTitle>{event.subtitle}</SubTitle>
                  </View>
                </Row>
                <Row fluid separator vertical="fit">
                  <Button color="Z">
                    <Button.Icon color="A" name="ios-time-outline" />
                    <Button.Text color="F">
                      {this.formatTimeRange(event)}
                    </Button.Text>
                  </Button>
                  <Button color={addded ? 'Z' : 'A'} onPress={this.handleToogleCalendar}>
                    <Button.Icon color={addded ? 'A' : 'Z'} name="ios-calendar" />
                    <Button.Text color={addded ? 'A' : 'Z'}>
                      Agregar a agenda
                    </Button.Text>
                  </Button>
                </Row>
                <Row fluid separator vertical="fit">
                  <Button color="Z" onPress={this.handleLocationPress}>
                    <Button.Icon color="A" name="ios-map-outline" />
                    <Button.Text color="F">
                      {location || 'Lugar por definir'}
                    </Button.Text>
                    {location && (
                      <Button.Icon color="A" position="right" name="ios-arrow-forward" />
                    )}
                  </Button>
                </Row>
                <Row fluid separator vertical="fit">
                  <Button color="Z" onPress={this.handleAdmissionPress}>
                    <Button.Icon color="A" name="ios-barcode-outline" />
                    <Button.Text color="F">
                      {event.admission.note || t(['events', 'admission', event.admission.ticket].join('.')).toUpperCase()}
                    </Button.Text>
                    <Button.Icon color="A" position="right" name="ios-arrow-forward" />
                  </Button>
                </Row>
                <Row>
                  <AboutTitle>
                    Sobre el evento
                  </AboutTitle>
                </Row>
                <Row>
                  <AboutText>
                    {get(event, 'description.full.md') || get(event, 'description.brief') || 'Sin descripción.'}
                  </AboutText>
                </Row>
                <Row>
                  {event.tags && event.tags.filter(Boolean).map(tag => (
                    <Tag key={tag._id}>{tag.name}</Tag>
                  ))}
                </Row>
                <Row fluid fit direction="column">
                  {get(event, 'social', []).filter(Boolean).map((url) => {
                    const obj = Social.parse(url);
                    return (
                      <Social key={url} url={url} onPress={this.handleSocialPress}>
                        <ActionText color="Z">Abrir en {startCase(obj.network)}</ActionText>
                        <Button.Icon color="Z" position="left" name="ios-arrow-forward" />
                      </Social>
                    );
                  })}
                </Row>
              </Content>
            </StyledParallaxScrollView>
          )}
        </Container>
      </Themed>
    );
  }
}
