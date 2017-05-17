import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { denormalize } from "normalizr";
import styled from "styled-components/native";
import get from "lodash/get";
import noop from "lodash/noop";

import { ListView, ListViewRowSurvey, Loading, ErrorBar } from "../components/";
import { fetchSurveys } from "../redux/modules/surveys";
import * as schemas from "../schemas";
import Themed from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const mapStateToProps = state => ({
  surveys: state.surveys,
  entities: state.entities,
});

const mapDispatchToProps = {
  fetchSurveys,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Surveys extends Component {
  static propTypes = {
    surveys: PropTypes.object,
    entities: PropTypes.object,
    navigation: PropTypes.object,

    fetchSurveys: PropTypes.func,
  };

  static defaultProps = {
    surveys: {},
    entities: {},
    navigation: null,

    fetchSurveys: noop,
  };

  static denormalize = ({ surveys, entities }) => {
    const schema = [schemas.survey];
    return denormalize(surveys.result, schema, entities).filter(Boolean);
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
    this.props.fetchSurveys();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.entities && nextProps.surveys) {
      const items = this.constructor.denormalize(nextProps);
      this.setState({
        dataSource: this.constructor.DataSource.cloneWithRows(items),
      });
    }
  }

  handlePress = item => {
    const { navigation } = this.props;

    if (item && navigation) {
      navigation.navigate("Survey", {
        _id: item._id,
        title: "Encuesta",
      });
    }
  };

  renderRow = (item, section, row, highlight) => (
    <ListViewRowSurvey
      item={item}
      selection={get(this.props.surveys, ["selected", item._id])}
      row={row}
      highlight={highlight}
      onPress={() => this.handlePress(item)}
      first={Number(row) === 0}
      last={this.state.dataSource.getRowCount() - 1 === Number(row)}
    />
  );

  render = () => {
    const { error, refreshing } = this.props.surveys;
    const { dataSource } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}
            refreshing={refreshing}
            onRefresh={this.props.fetchSurveys}
            renderEmpty={() => (
              <Loading>
                <Loading.Logo />
                <Loading.Text>
                  {refreshing ? "Cargando..." : "No hay encuestas para mostrar"}
                </Loading.Text>
              </Loading>
            )}
          />
        </Container>
      </Themed>
    );
  };
}
