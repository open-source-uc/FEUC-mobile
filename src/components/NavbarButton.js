import React, { PureComponent } from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import { connect } from "react-redux";
import { denormalize } from "normalizr";

import * as schemas from "../schemas";

const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Icon = styled(Ionicons)`
  color: white;
  margin: 5 18;
`;

Icon.defaultProps = {
  size: 26,
};

const Text = styled.Text`
  margin-right: -10;
  margin-bottom: 2;
  font-weight: bold;
  color: white;
`;

const mapStateToProps = state => ({
  notifications: state.notifications,
  entities: state.entities,
});

const mapDispatchToProps = null;

@connect(mapStateToProps, mapDispatchToProps)
class NotificationCount extends PureComponent {
  static propTypes = {
    notifications: PropTypes.object,
    entities: PropTypes.object,
  };

  render() {
    const { notifications, entities } = this.props;
    const schema = [schemas.notification];
    const array = denormalize(notifications.result, schema, entities);
    const count = array.reduce(
      (previous, current) =>
        notifications.seen[current._id] ? previous : previous + 1,
      0
    );
    return <Text>{count}</Text>;
  }
}

export default class NavbarButton extends PureComponent {
  static Icon = Icon;
  static NotificationCount = NotificationCount;

  static propTypes = TouchableOpacity.propTypes;

  render() {
    return <Container {...this.props} />;
  }
}
