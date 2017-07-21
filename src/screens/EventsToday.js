import React, { Component } from "react";
import { ListView, Dimensions, findNodeHandle } from "react-native";
import PropTypes from "prop-types";
import { BlurView } from "react-native-blur";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { denormalize } from "normalizr";
import styled from "styled-components/native";
import get from "lodash/get";
import noop from "lodash/noop";

import { Card, RefreshControl, Loading, ErrorBar } from "../components/";
import { fetchEvents } from "../redux/modules/events";
import * as schemas from "../schemas";
import Themed, { colors } from "../styles";
import { images } from "../assets/";
import { getDateProperties } from "../utils/events";

const Container = styled.View`flex: 1;`;

const Background = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.background};
`;

const Controls = styled.View`
  flex: 1;
  background-color: transparent;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const Blurred = styled(BlurView)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

Blurred.defaultProps = {
  blurType: "light",
  blurAmount: 30,
};

const VerticalScrollView = styled.ScrollView`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

VerticalScrollView.defaultProps = {
  contentContainerStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

const HorizontalListView = styled.ListView`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

HorizontalListView.defaultProps = {
  horizontal: true,
  pagingEnabled: true,
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
};

const Page = styled.View`
  width: ${() => Dimensions.get("window").width};
  justify-content: center;
  flex-direction: row;
  flex: 1;
  padding: 22 36 18;
`;

const CardContent = styled.View`
  flex: 1;
  padding: 14 12 12 12;
  background-color: transparent;
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.G};
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 700;
  font-size: 14;
  margin-bottom: 4;
`;

Title.defaultProps = {
  numberOfLines: 2,
};

const Body = styled.Text`
  flex: 1;
  color: ${props => props.theme.colors.E};
  font-family: ${props => props.theme.fonts.body};
  font-weight: 400;
  font-size: 11;
  font-style: italic;
`;

Body.defaultProps = {
  numberOfLines: 3,
};

const Arrow = styled(Ionicons)`
  color: ${props => props.theme.colors.Z};
  background-color: transparent;
  font-size: 28;
  text-align: center;
  margin: 0 10;
`;

const Calendar = styled(Ionicons)`
  color: ${props =>
    props.active ? props.theme.colors.B : props.theme.colors.F};
  background-color: transparent;
  font-size: 17;
  text-align: center;
  margin-right: 5;
  padding-top: 3;
`;

const Nothing = styled.View``;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const When = styled.Text`
  flex: 1;
  color: ${props => props.theme.colors.B};
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 600;
  font-size: 11;
`;

const mapStateToProps = state => ({
  events: state.events,
  entities: state.entities,
});

const mapDispatchToProps = {
  fetchEvents,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class EventsToday extends Component {
  static propTypes = {
    events: PropTypes.object,
    entities: PropTypes.object, // eslint-disable-line
    navigation: PropTypes.object,

    fetchEvents: PropTypes.func,
  };

  static defaultProps = {
    events: {},
    entities: {},
    navigation: null,

    fetchEvents: noop,
  };

  static denormalize = ({ events, entities }) => {
    const schema = [schemas.event];
    return denormalize(events.result, schema, entities).filter(Boolean);
  };

  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1._id !== r2._id,
  });

  state = {
    dataSource: this.constructor.DataSource.cloneWithRows(
      this.constructor.denormalize(this.props)
    ),
    index: get(this.props, "events.result.length", 0) > 0 ? 0 : null,
  };

  componentDidMount = () => {
    this.props.fetchEvents();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.entities && nextProps.events) {
      const items = this.constructor.denormalize(nextProps);
      this.setState({
        dataSource: this.constructor.DataSource.cloneWithRows(items),
      });
    }
  }

  handlePress = item => {
    const { navigation } = this.props;

    if (item && navigation) {
      navigation.navigate("Event", { _id: item._id, title: item.title });
    }
  };

  handleScroll = event => {
    const { index } = this.state; // current
    const width = Dimensions.get("window").width;
    const x = event.nativeEvent.contentOffset.x + 20;

    const page = Math.max(0, Math.floor(x / width));
    if (page !== index) {
      this.setState({ index: page });
    }
  };

  renderRow = (item, section, row, highlight) => {
    const isSaved = this.props.events.saved.includes(item._id);
    const date = getDateProperties(item, true);

    return (
      <Page>
        <Card highlight={highlight}>
          <Card.Cover
            source={{ uri: get(item, "banner.secure_url") }}
            onPress={() => this.handlePress(item)}
          >
            <Card.EventDate date={new Date(get(item, "temporality.start"))} />
          </Card.Cover>
          <Card.Bottom>
            <CardContent>
              <Title>
                {get(item, "title", "Sin título").toUpperCase()}
              </Title>
              <Body>
                {get(item, "description.brief")}
              </Body>
              <Footer>
                <When>
                  {date.range.toUpperCase()}
                </When>
                <Calendar
                  name={isSaved ? "ios-calendar" : "ios-calendar-outline"}
                  active={isSaved}
                />
              </Footer>
            </CardContent>
          </Card.Bottom>
        </Card>
      </Page>
    );
  };

  render() {
    const { events: { error, refreshing, result }, entities } = this.props;
    const { index, dataSource } = this.state;
    const current = entities.events[result[index]];
    const uri =
      get(current, "image.secure_url") || get(current, "banner.secure_url");

    return (
      <Themed content="dark">
        <Container>
          {current &&
            <Background
              innerRef={background => {
                this.background = background;
              }}
              source={uri ? { uri } : images.default.card}
              onLoadEnd={() =>
                this.setState({ viewRef: findNodeHandle(this.background) })}
            >
              <Blurred viewRef={this.state.viewRef} />
            </Background>}
          <ErrorBar error={error} />
          {current &&
            <Controls>
              {index > 0 && <Arrow name="ios-arrow-back" left />}
              {index > 0 && <Nothing />}
              {index <= get(result, "length", 0) && <Nothing />}
              {index < get(result, "length", 0) - 1 &&
                <Arrow name="ios-arrow-forward" right />}
            </Controls>}
          <VerticalScrollView
            refreshing={refreshing}
            onRefresh={this.props.fetchEvents}
            renderEmpty={() =>
              <Loading>
                <Loading.Logo />
                <Loading.Text>
                  {refreshing ? "Cargando..." : "No eventos para mostrar aquí"}
                </Loading.Text>
              </Loading>}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.props.fetchEvents}
                tintColor={colors.Z}
              />
            }
          >
            <HorizontalListView
              enableEmptySections
              scrollEventThrottle={16}
              onScroll={this.handleScroll}
              dataSource={dataSource}
              renderRow={this.renderRow}
            />
          </VerticalScrollView>
        </Container>
      </Themed>
    );
  }
}
