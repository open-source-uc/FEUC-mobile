import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { denormalize } from "normalizr";
import styled from "styled-components/native";
import get from "lodash/get";

import { ErrorBar } from "../components/";
import * as schemas from "../schemas";
import Themed from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.Z};
`;

const Text = styled.Text``;

const mapStateToProps = ({ nav, entities }) => {
  const id = get(nav, ["routes", nav.index, "params", "_id"]);
  return {
    campus: id ? denormalize(id, schemas.campus, entities) : null,
  };
};

const mapDispatchToProps = null;

@connect(mapStateToProps, mapDispatchToProps)
export default class Campus extends Component {
  static navigationOptions = {
    title: "FEUC",
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: state.params ? state.params.title : "Campus",
    }),
  };

  static propTypes = {
    campus: PropTypes.object,
    error: PropTypes.object,
    bannerHeight: PropTypes.number,
  };

  static defaultProps = {
    campus: null,
    error: null,
    bannerHeight: 190,
  };

  state = {
    campus: this.props.campus,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.campus) {
      this.setState({ campus: nextProps.campus });
    }
  }

  render() {
    const { error } = this.props;
    const { campus } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          {campus &&
            <Text>
              {campus.name}
            </Text>}
        </Container>
      </Themed>
    );
  }
}
