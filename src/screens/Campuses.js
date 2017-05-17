import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { denormalize } from "normalizr";
import styled from "styled-components/native";
import noop from "lodash/noop";

import { ListView, ListViewRowCampus, Loading, ErrorBar } from "../components/";
import { fetchCampuses } from "../redux/modules/campuses";
import * as schemas from "../schemas";
import Themed from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const mapStateToProps = state => ({
  campuses: state.campuses,
  entities: state.entities,
});

const mapDispatchToProps = {
  fetchCampuses,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Campuses extends Component {
  static propTypes = {
    campuses: PropTypes.object,
    entities: PropTypes.object, // eslint-disable-line
    navigation: PropTypes.object,

    fetchCampuses: PropTypes.func,
  };

  static defaultProps = {
    campuses: {},
    entities: {},
    navigation: null,

    fetchCampuses: noop,
  };

  static denormalize = ({ campuses, entities }) => {
    const schema = [schemas.campus];
    return denormalize(campuses.result, schema, entities).filter(Boolean);
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
    this.props.fetchCampuses();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.entities && nextProps.campuses) {
      const items = this.constructor.denormalize(nextProps);
      this.setState({
        dataSource: this.constructor.DataSource.cloneWithRows(items),
      });
    }
  }

  handlePress = item => {
    const { navigation } = this.props;

    if (item && navigation) {
      navigation.navigate("Campus", {
        _id: item._id,
        title: item.name,
      });
    }
  };

  renderRow = (item, section, row, highlight) => (
    <ListViewRowCampus
      item={item}
      row={row}
      highlight={highlight}
      onPress={() => this.handlePress(item)}
      first={Number(row) === 0}
      last={this.state.dataSource.getRowCount() - 1 === Number(row)}
    />
  );

  render = () => {
    const { error, refreshing } = this.props.campuses;
    const { dataSource } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}
            refreshing={refreshing}
            onRefresh={this.props.fetchCampuses}
            renderEmpty={() => (
              <Loading>
                <Loading.Logo />
                <Loading.Text>
                  {refreshing ? "Cargando..." : "No hay lugares para mostrar"}
                </Loading.Text>
              </Loading>
            )}
          />
        </Container>
      </Themed>
    );
  };
}
