import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { denormalize } from "normalizr";
import styled from "styled-components/native";
import get from "lodash/get";
import noop from "lodash/noop";

import {
  ListView,
  ListViewRowNotification,
  Loading,
  ErrorBar,
} from "../components/";
import * as schemas from "../schemas";
import {
  viewNotification,
  fetchNotifications,
} from "../redux/modules/notifications";
import Themed from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const mapStateToProps = state => ({
  notifications: state.notifications,
  entities: state.entities,
});

const mapDispatchToProps = {
  viewNotification,
  fetchNotifications,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Notifications extends Component {
  static propTypes = {
    notifications: PropTypes.object,
    entities: PropTypes.object,
    navigation: PropTypes.object,

    viewNotification: PropTypes.func,
    fetchNotifications: PropTypes.func,
  };

  static defaultProps = {
    notifications: {},
    entities: {},
    navigation: null,

    viewNotification: noop,
    fetchNotifications: noop,
  };

  static denormalize = ({ notifications, entities }) => {
    const schema = [schemas.notification];
    return denormalize(notifications.result, schema, entities);
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
    this.props.fetchNotifications();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.entities && nextProps.notifications) {
      const items = this.constructor.denormalize(nextProps);
      this.setState({
        dataSource: this.constructor.DataSource.cloneWithRows(items),
      });
    }
  }

  handlePress = item => {
    this.props.viewNotification(item);
  };

  renderRow = (item, section, row, highlight) => (
    <ListViewRowNotification
      item={item}
      seen={get(this.props.notifications, ["seen", item._id || item], false)}
      row={row}
      highlight={highlight}
      onPress={() => this.handlePress(item)}
      first={Number(row) === 0}
      last={this.state.dataSource.getRowCount() - 1 === Number(row)}
    />
  );

  render = () => {
    const { error, refreshing } = this.props.notifications;
    const { dataSource } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}
            refreshing={refreshing}
            onRefresh={this.props.fetchNotifications}
            renderEmpty={() => (
              <Loading>
                <Loading.Logo />
                <Loading.Text>
                  {refreshing ? "Cargando..." : "No hay notificaciones"}
                </Loading.Text>
              </Loading>
            )}
          />
        </Container>
      </Themed>
    );
  };
}
