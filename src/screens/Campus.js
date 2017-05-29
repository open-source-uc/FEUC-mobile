import React, { Component } from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { denormalize } from "normalizr";
import styled from "styled-components/native";
import get from "lodash/get";

import { MapView, ListView, ListViewRow, ErrorBar } from "../components/";
import { images } from "../assets/";
import * as schemas from "../schemas";
import Themed from "../styles";

function selectImage(item) {
  const uri = get(item, ["image", "secure_url"]);
  if (uri) return { uri };

  return images.default.benefit;
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.Z};
`;

const Header = styled.View`
  flex: 1;
  height: 170;
`;

const ListViewRowContent = styled.View`
  flex: 1;
  margin-left: 12;
`;

const ListViewRowGroup = ({ item, row, ...props }) => (
  <ListViewRow
    background={Platform.OS === "android" && row % 2 ? "X" : "Z"}
    {...props}
  >
    <ListViewRow.Thumbnail size={40} circle shadow source={selectImage(item)} />
    <ListViewRowContent>
      <ListViewRow.Title>{item.name}</ListViewRow.Title>
      <ListViewRow.Body>
        {item.description}
      </ListViewRow.Body>
    </ListViewRowContent>
    <ListViewRow.Disclosure />
  </ListViewRow>
);

ListViewRowGroup.propTypes = {
  item: PropTypes.object.isRequired,
  row: PropTypes.any.isRequired,
};

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
  };

  static denormalize = () => {
    return [
      {
        _id: 0,
        name: "Salas A",
        description: "A1 a la A8",
        image: {
          secure_url: "http://megaicons.net/static/img/icons_sizes/8/178/128/maps-and-geolocation-map-marker-icon.png",
        },
      },
      {
        _id: 1,
        name: "Salas B",
        description: "B1 a la B27",
        image: {
          secure_url: "http://megaicons.net/static/img/icons_sizes/8/178/128/maps-and-geolocation-map-marker-icon.png",
        },
      },
    ];
  };

  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1._id !== r2._id,
  });

  state = {
    dataSource: this.constructor.DataSource.cloneWithRows(
      this.constructor.denormalize(this.props)
    ),
    campus: this.props.campus,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.campus) {
      this.setState({ campus: nextProps.campus });
      // const items = this.constructor.denormalize(nextProps);
      // this.setState({
      //   dataSource: this.constructor.DataSource.cloneWithRows(items),
      // });
    }
  }

  renderHeader() {
    return (
      <Header>
        <MapView />
      </Header>
    );
  }

  renderRow = (item, section, row, highlight) => (
    <ListViewRowGroup
      item={item}
      row={row}
      highlight={highlight}
      onPress={() => this.handlePress(item)}
      first={Number(row) === 0}
      last={this.state.dataSource.getRowCount() - 1 === Number(row)}
    />
  );

  render() {
    const { error } = this.props;
    const { dataSource } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <ListView
            dataSource={dataSource}
            renderHeader={this.renderHeader}
            renderRow={this.renderRow}
          />
        </Container>
      </Themed>
    );
  }
}
