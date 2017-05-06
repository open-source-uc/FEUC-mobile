import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { denormalize } from "normalizr";
import styled from "styled-components/native";
import noop from "lodash/noop";

import { ListView, ListViewRowEvent, Loading, ErrorBar } from "../components/";
import { fetchEvents } from "../redux/modules/events";
import * as schemas from "../schemas";
import Themed from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const mapStateToProps = state => ({
  events: state.events,
  entities: state.entities,
});

const mapDispatchToProps = {
  fetchEvents,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Events extends Component {
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
    return denormalize(events.result, schema, entities);
  };

  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1._id !== r2._id,
  });

  state = {
    dataSource: this.constructor.DataSource.cloneWithRows(
      this.constructor.denormalize(this.props)
    ),
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
      navigation.navigate("Event", { eventId: item._id, title: item.title });
    }
  };

  renderRow = (item, section, row, highlight) => (
    <ListViewRowEvent
      item={item}
      row={row}
      highlight={highlight}
      onPress={() => this.handlePress(item)}
      first={Number(row) === 0}
      last={this.state.dataSource.getRowCount() - 1 === Number(row)}
    />
  );

  render = () => {
    const { error, refreshing } = this.props.events;
    const { dataSource } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}
            refreshing={refreshing}
            onRefresh={this.props.fetchEvents}
            renderEmpty={() => (
              <Loading>
                <Loading.Logo />
                <Loading.Text>
                  {refreshing
                    ? "Cargando..."
                    : "No hay eventos para mostrar, vuelve pronto a revisar ;)"}
                </Loading.Text>
              </Loading>
            )}
          />
        </Container>
      </Themed>
    );
  };
}
