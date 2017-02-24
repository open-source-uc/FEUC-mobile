import React, { PropTypes, Component } from 'react';
import { StyleSheet, Linking, Dimensions } from 'react-native';
import { Svg as SVG, Polygon } from 'react-native-svg';
import styled from 'styled-components/native';
import moment from 'moment';
import get from 'lodash/get';

import client from '../api-client';
import { Button, ErrorBar, Tag, EventDate, RichText, Loading } from '../components/';
import Themed, { colors } from '../styles';

const temp = {
  default: 'http://www.joblo.com/posters/images/full/1982-pink-floyd-the-wall-poster1.jpg',
};


const Container = styled.View`
  background-color: ${props => props.theme.colors.black};
  flex: 1;
`;

const Banner = styled.Image`
  width: ${Dimensions.get('window').width};
  background-color: ${props => props.theme.colors.F};
  resize-mode: cover;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 256;
`;

const BannerContent = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;

const StyledSVG = styled(SVG)`
  width: ${Dimensions.get('window').width};
  height: ${props => props.height};
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

ScrollView.defaultProps = {
  contentContainerStyle: { paddingBottom: 24 },
};

const Content = styled.View`
  background-color: ${props => props.theme.colors.Z};
  margin-top: 256;
  padding: 0 0;
`;

const Row = styled.View`
  justify-content: flex-start;
  flex-direction: ${props => props.direction || 'row'};
  flex-wrap: wrap;
  align-items: center;
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

const ActionContainer = styled.TouchableOpacity`
  background-color: ${props => (props.theme.colors[props.background] || props.theme.colors.D)};
  flex: 1;
  flex-direction: row;
  height: 44;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 18;
`;

const ActionText = styled.Text`
  font-family: ${props => props.theme.fonts.main};
  color: ${props => props.theme.colors[props.color] || props.theme.colors.F};
`;


export default class Event extends Component {
  static navigationOptions = {
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: state.params ? state.params.title : 'EVENTO',
    }),
  }

  static propTypes = {
    navigation: PropTypes.any,
  }

  static defaultProps = {
    navigation: null,
  }

  state = {
    event: null,
    refreshing: true,
    error: null,
  }

  componentDidMount() {
    const { navigation } = this.props;
    if (navigation && navigation.state.params) {
      this.fetchContent(navigation.state.params._id, { showRefresh: false });
    }
  }

  fetchContent = (identifier, options = { showRefresh: true }) => {
    this.setState({ refreshing: options.showRefresh });

    return client.event(identifier).then(
      event => this.setState({ refreshing: false, error: null, event }),
      error => this.setState({ refreshing: false, error }),
    );
  }

  handleToogleCalendar = () => {
    alert('Calendar');
  }

  handleFacebookPress = async () => {
    const url = this.state.event.facebook;
    try {
      Linking.openURL(url);
    } catch (err) {
      console.error(err);
    }
  }

  handleTwitterPress = async () => {
    const url = this.state.event.twitter;
    try {
      Linking.openURL(url);
    } catch (err) {
      console.error(err);
    }
  }

  handleAdmissionPress = async () => {
    const url = this.state.event.admission.url;
    try {
      Linking.openURL(url);
    } catch (err) {
      console.error(err);
    }
  }

  handleLocationPress = () => {
    alert(this.state.event.location.street1);
  }

  render() {
    const { event, addded, error } = this.state;

    if (!event) {
      return (
        <Themed content="dark">
          <Container>
            <ErrorBar error={error} />
            <Loading />
          </Container>
        </Themed>
      );
    }

    // Triangle dimensions
    const width = Dimensions.get('window').width;
    const height = 40;

    const points = [
      [0, height],
      [width, height],
      [width, 0],
    ];

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <ScrollView>
            <ErrorBar error={error} />
            <Banner source={{ uri: temp.default }}>
              <BannerContent>
                <StyledSVG height={height}>
                  <Polygon
                    points={points.reduce((string, [x, y]) => `${string} ${x},${y}`, '')}
                    fill={colors.Z}
                  />
                </StyledSVG>
                <EventDate date={new Date(event.temporality.start)} />
              </BannerContent>
            </Banner>
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
                    {moment(event.temporality.start).format('HH:mm')} - {moment(event.temporality.end).format('HH:mm')}
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
                    {event.location.street1}, {event.location.suburb}
                  </Button.Text>
                  <Button.Icon color="A" position="right" name="ios-arrow-forward" />
                </Button>
              </Row>
              <Row fluid separator vertical="fit">
                <Button color="Z" onPress={this.handleAdmissionPress}>
                  <Button.Icon color="A" name="ios-barcode-outline" />
                  <Button.Text color="F">
                    {event.admission.note}
                  </Button.Text>
                  <Button.Icon color="A" position="right" name="ios-arrow-forward" />
                </Button>
              </Row>
              <Row>
                <AboutTitle>
                  {'Sobre el evento'}
                </AboutTitle>
              </Row>
              <Row>
                <AboutText>
                  {get(event, 'description.full.md') || event.description.brief}
                </AboutText>
              </Row>
              <Row>
                {event.tags.map(tag => (
                  <Tag key={tag._id} name={tag.name} />
                ))}
              </Row>
              <Row fluid>
                <View>
                  {/*
                  <ActionContainer>
                    <ActionText>Entrada liberada</ActionText>
                  </ActionContainer>
                   */}
                  {event.facebook && (
                    <ActionContainer background="facebook" onPress={this.handleFacebookPress}>
                      <ActionText color="Z">Facebook</ActionText>
                      <Button.Icon color="Z" position="right" name="ios-arrow-forward" />
                    </ActionContainer>
                  )}
                  {event.twitter && (
                    <ActionContainer background="twitter" onPress={this.handleTwitterPress}>
                      <ActionText color="Z">Twitter</ActionText>
                      <Button.Icon color="Z" position="right" name="ios-arrow-forward" />
                    </ActionContainer>
                  )}
                </View>
              </Row>
            </Content>
          </ScrollView>
        </Container>
      </Themed>
    );
  }
}
