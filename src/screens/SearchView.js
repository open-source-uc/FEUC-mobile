import React, { Component } from "react";
import { StyleSheet, ListView, Dimensions } from "react-native";
import PropTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { denormalize } from "normalizr";
import styled from "styled-components/native";
import noop from "lodash/noop";

import { Loading, ErrorBar, SearchTags, SearchTag } from "../components/";
import {
  fetchTags,
  selectTag,
  deselectTag,
  selectCampus,
} from "../redux/modules/tags";
import * as schemas from "../schemas";
import Themed, { colors } from "../styles";

const Container = styled(LinearGradient)`
  flex: 1;
  background-color: ${props => props.theme.colors.B};
`;

Container.defaultProps = {
  colors: [colors.A, colors.B],
  start: { x: 0.0, y: 1.0 },
  end: { x: 1.0, y: 0.0 },
};

const SearchBar = styled.View`
  height: 40;
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.Z};
  width: 76;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  padding: 0 18;
  color: ${props => props.theme.colors.Z};
  background-color: #FFFFFF22;
  font-size: 16;
  font-weight: 500;
`;

SearchInput.defaultProps = {
  placeholderTextColor: colors.X,
  returnKeyType: "search",
  selectionColor: colors.C,
  underlineColorAndroid: "transparent",
};

const SearchIcon = styled(Ionicons)`
  color: ${props => props.theme.colors.B};
  font-size: 22;
`;

SearchIcon.defaultProps = {
  name: "ios-search",
};

const Cell = styled.View`
  height: ${() => Dimensions.get("window").width / 3};
  width: ${() => Dimensions.get("window").width / 3};
  border-right-width: ${StyleSheet.hairlineWidth};
  border-bottom-width: ${StyleSheet.hairlineWidth};
  border-color: ${props => props.theme.colors.Y};
`;

const CellTouch = styled.TouchableOpacity`
  background-color: ${props =>
    props.selected ? props.theme.colors.C : "transparent"};
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CellIcon = styled(Ionicons)`
  color: ${props =>
    props.selected ? props.theme.colors.Z : props.theme.colors.Y};
  font-size: 40;
`;

const CellText = styled.Text`
  color: ${props =>
    props.selected ? props.theme.colors.Z : props.theme.colors.Y};
  font-family: ${props => props.theme.fonts.main};
  font-size: 13;
  font-weight: 400;
`;

const Grid = styled(ListView)`
  background-color: transparent;
  margin-top: 10;
  flex: 1;
`;

Grid.defaultProps = {
  contentContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
};

const Title = styled.Text`
  color: ${props => props.theme.colors.Z};
  background-color: transparent;
  font-family: ${props => props.theme.fonts.main};
  text-align: center;
  font-weight: 800;
  font-size: 14;
`;

const Bottom = styled.View`
  background-color: ${props => props.theme.colors.C};
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding-top: 15;
  elevation: 4;
  shadow-color: ${props => props.theme.colors.G};
  shadow-offset: 0 -2;
  shadow-opacity: 0.2;
  shadow-radius: 0;
`;

const CampusScroll = styled.ScrollView`margin: 15 0;`;

CampusScroll.defaultProps = {
  horizontal: true,
  contentContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

const CampusCircle = styled.TouchableOpacity`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size / 2};
  background-color: ${props =>
    props.selected ? props.theme.colors.Z : "#00000077"};
  justify-content: center;
  align-items: center;
  margin: 0 10;
`;

CampusCircle.defaultProps = {
  size: 40,
};

const CampusCircleText = styled.Text`
  font-family: ${props => props.theme.fonts.main};
  color: ${props =>
    props.selected ? props.theme.colors.C : props.theme.colors.G};
  font-weight: 200;
  font-size: 18;
`;

const CurrentCampus = styled.View`
  height: 36;
  background-color: #3b9085;
  justify-content: center;
  align-items: center;
  elevation: 4;
  shadow-color: ${props => props.theme.colors.G};
  shadow-offset: 0 -2;
  shadow-opacity: 0.1;
  shadow-radius: 2;
`;

const CurrentCampusText = styled.Text`
  color: ${props => props.theme.colors.Z};
  text-align: center;
  font-weight: 700;
  font-size: 11;
`;

const mapStateToProps = state => ({
  tags: state.tags,
  entities: state.entities,
});

const mapDispatchToProps = {
  fetchTags,
  selectCampus,
  selectTag,
  deselectTag,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchView extends Component {
  static propTypes = {
    tags: PropTypes.object,
    entities: PropTypes.object, // eslint-disable-line
    // navigation: PropTypes.object,

    fetchTags: PropTypes.func,
    selectCampus: PropTypes.func,
    selectTag: PropTypes.func,
    deselectTag: PropTypes.func,
  };

  static defaultProps = {
    tags: {},
    entities: {},
    // navigation: null,
    fetchTags: noop,
    selectCampus: noop,
    selectTag: noop,
    deselectTag: noop,
  };

  static denormalize = ({ tags, entities }) => {
    const schema = [schemas.tag];
    const result = denormalize(tags.result, schema, entities);
    return result.filter(tag => tag && tag.searchable);
  };

  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1._id !== r2._id,
  });

  state = {
    search: "",
    dataSource: this.constructor.DataSource.cloneWithRows(
      this.constructor.denormalize(this.props)
    ),
  };

  componentDidMount = () => {
    this.props.fetchTags();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.entities && nextProps.tags) {
      const items = this.constructor.denormalize(nextProps);
      this.setState({
        dataSource: this.constructor.DataSource.cloneWithRows(items),
      });
    }
  }

  handleSearchPress = () => {
    // const { search } = this.state;
    this.setState({ search: "" });
  };

  handleItemSelection = item => {
    const { tags } = this.props;
    if (tags.selected.includes(item._id)) {
      this.props.deselectTag(item._id);
    } else {
      this.props.selectTag(item._id);
    }
  };

  handleCampusSelection = item => {
    const { tags } = this.props;
    if (tags.campus === item._id) {
      this.props.selectCampus(null);
    } else {
      this.props.selectCampus(item._id);
    }
  };

  renderRow = item => {
    const { tags } = this.props;
    const selected = tags.selected.includes(item._id);

    return (
      <Cell selected={selected}>
        <CellTouch
          selected={selected}
          onPress={() => this.handleItemSelection(item)}
        >
          <CellIcon selected={selected} name={item.icon || "ios-bookmark"} />
          <CellText selected={selected}>
            {item.name}
          </CellText>
        </CellTouch>
      </Cell>
    );
  };

  render = () => {
    const { tags, entities } = this.props;
    const { search, dataSource } = this.state;

    const campuses = Object.values(entities.campuses);

    const currentCampus = tags.campus && entities.campuses[tags.campus];
    const currentTags = denormalize(
      tags.selected,
      [schemas.tag],
      entities
    ).filter(Boolean);

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={tags.error} />
          <SearchBar>
            <SearchInput
              placeholder="Buscar..."
              value={search}
              onChangeText={text => this.setState({ search: text })}
              onSubmitEditing={this.handleSearchPress}
            />
            <SearchButton onPress={this.handleSearchPress}>
              <SearchIcon />
            </SearchButton>
          </SearchBar>
          <SearchTags>
            {currentTags.map(tag =>
              <SearchTag
                key={tag._id}
                onPress={() => this.handleItemSelection(tag)}
              >
                {(tag.name || tag.title).toUpperCase()}
              </SearchTag>
            )}
          </SearchTags>
          <Title>Busca por categorías</Title>
          <Grid
            dataSource={dataSource}
            renderRow={this.renderRow}
            refreshing={tags.refreshing}
            onRefresh={this.props.fetchTags}
            renderEmpty={() =>
              <Loading>
                <Loading.Logo />
                <Loading.Text>
                  {tags.refreshing
                    ? "Cargando..."
                    : "No hay etiquetas para mostrar."}
                </Loading.Text>
              </Loading>}
          />
          <Bottom>
            <Title>Busca por campus</Title>
            <CampusScroll>
              {campuses.map(campus =>
                <CampusCircle
                  key={campus._id}
                  selected={currentCampus && campus._id === currentCampus._id}
                  onPress={() => this.handleCampusSelection(campus)}
                >
                  <CampusCircleText
                    selected={currentCampus && campus._id === currentCampus._id}
                  >
                    {campus.short ||
                      campus.name.split(" ").map(text => text[0]).join("")}
                  </CampusCircleText>
                </CampusCircle>
              )}
            </CampusScroll>
            <CurrentCampus>
              <CurrentCampusText>
                {currentCampus
                  ? currentCampus.name.toUpperCase()
                  : "Todos los campus"}
              </CurrentCampusText>
            </CurrentCampus>
          </Bottom>
        </Container>
      </Themed>
    );
  };
}
