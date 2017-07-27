import React, { Component } from "react";
import { StyleSheet, Linking, Platform } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import styled from "styled-components/native";
import _ from "lodash";

import {
  ListView,
  MapView,
  ListViewRowPlace,
  Button,
  Loading,
  ErrorBar,
} from "../components/";
import { fetchCampus } from "../redux/modules/campuses";
import Themed from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.X};
`;

const Header = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.A};
  border-top-color: ${props => props.theme.colors.E};
  border-top-width: ${StyleSheet.hairlineWidth};
`;

const ButtonText = styled(Button.Text)`
  text-align: center;
  font-size: 16;
  font-weight: 800;
`;

const Empty = styled.View``;

const TouchableOpacity = styled.TouchableOpacity``;

const PlaceTitle = styled.Text`
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 700;
  margin-bottom: 4;
`;

const PlaceDescription = styled.Text`
  font-family: ${props => props.theme.fonts.body};
  color: ${props => props.theme.colors.F};
`;

const PlaceContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-top-color: ${props => props.theme.colors.E};
  border-top-width: ${StyleSheet.hairlineWidth};
  padding: 14 5;
`;

const PlaceContent = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 18;
`;

const DownArrow = styled(Ionicons)`
  flex: 1;
  width: ${props => props.size};
  height: ${props => props.size};
  color: white;
  text-align: center;
`;

DownArrow.defaultProps = {
  size: 20,
};

const PlaceShare = styled(Ionicons)`
  width: ${props => props.size};
  height: ${props => props.size};
  color: ${props => props.theme.colors.A};
  text-align: center;
  margin: 20 18 20 10;
`;

PlaceShare.defaultProps = {
  size: 30,
  name: "ios-share",
};

const SubHeader = styled.View`
  background-color: ${props => props.theme.colors.X};
  margin-top: 22;
  padding-left: 18;
  padding-bottom: 10;
`;

const SubHeaderText = styled.Text`
  color: ${props => props.theme.colors.E};
  font-weight: 600;
  font-size: 14;
`;

const MapTypes = styled.TouchableOpacity`
  position: absolute;
  background-color: ${props => props.theme.colors.E};
  top: 18;
  left: 18;
  height: 28;
  width: 50;
  border-radius: 5;
  justify-content: center;
  align-items: center;
`;

const MapTypesText = styled.Text`
  color: white;
  font-size: 11;
  text-align: center;
  font-weight: bold;
`;

const mapStateToProps = ({ nav, campuses, entities }) => {
  const id = _.get(nav, ["routes", nav.index, "params", "_id"]);
  const categories = entities.categories || {};
  const campus = id ? entities.campuses[id] : null;

  if (campus) {
    const placesMap = _(entities.places || {})
      .values()
      .filter(place => place.campus === id)
      .groupBy("category")
      .value();

    const sortedCategories = _(categories)
      .values()
      .sortBy("sortOrder")
      .map("_id")
      .value();

    const dataBlob = {};
    const sectionIdentities = [];
    sortedCategories.forEach(id => {
      const places = placesMap[id];
      if (!_.isEmpty(places)) {
        sectionIdentities.push(id);
        dataBlob[id] = places;
      }
    });

    return {
      campuses,
      campus,
      sectionIdentities,
      places: dataBlob,
      categories: categories,
    };
  } else {
    return { campuses };
  }
};

const mapDispatchToProps = {
  fetchCampus: fetchCampus,
};

@connect(mapStateToProps, mapDispatchToProps)
@connectActionSheet
export default class Campus extends Component {
  static navigationOptions = {
    title: "FEUC",
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: state.params ? state.params.title : "Campus",
    }),
  };

  static propTypes = {
    showActionSheetWithOptions: PropTypes.func,
    fetchCampus: PropTypes.func,
    campuses: PropTypes.object,
    campus: PropTypes.object,
    places: PropTypes.object,
    categories: PropTypes.object,
    sectionIdentities: PropTypes.array.isRequired,
  };

  static defaultProps = {
    showActionSheetWithOptions: _.noop,
    fetchCampus: _.noop,
    campuses: null,
    campus: null,
    places: {},
    categories: {},
    sectionIdentities: [],
  };

  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1._id !== r2._id,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
  });

  state = {
    campus: this.props.campus,
    empty: this.constructor.DataSource.cloneWithRows([]),
    dataSource: this.constructor.DataSource.cloneWithRows([]),
    categories: this.props.categories,
    expanded: false,
    place: this.props.campus,
    placeIsCampus: true,
    hybrid: true,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.campus) {
      this.setState({
        campus: nextProps.campus,
        categories: nextProps.categories,
        dataSource: this.constructor.DataSource.cloneWithRowsAndSections(
          nextProps.places,
          nextProps.sectionIdentities
        ),
      });
    }
  }

  fetchData = () => {
    this.state.campus &&
      this.props.fetchCampus &&
      this.props.fetchCampus(this.state.campus._id);
  };

  handleMapType = () => {
    this.setState({ hybrid: !this.state.hybrid });
  };

  handlePress = item => {
    try {
      const coords = item.location && MapView.parseLocation(item.location);
      if (this.map && coords) {
        this.map.animateToCoordinate(coords);
      }
    } catch (e) {
      console.log("Error zooming:", e); // eslint-disable-line
    } finally {
      this.setState({ place: item, expanded: true, placeIsCampus: false });
    }
  };

  handleExternal = item => {
    const { longitude, latitude } = MapView.parseLocation(item.location);
    if (!(longitude && latitude)) {
      return alert("Este lugar no tiene aún una posición en el mapa.");
    }

    const url = {
      apple: `http://maps.apple.com/maps?daddr=${latitude},${longitude}`,
      google: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    };
    if (Platform.OS === "ios") {
      const options = [
        "Abrir en Google Maps",
        "Abrir en Apple Maps",
        "Cancelar",
      ];
      this.props.showActionSheetWithOptions(
        { options, cancelButtonIndex: options.length - 1 },
        index => {
          try {
            if (index === 0) {
              return Linking.openURL(url.google);
            } else if (index === 1) {
              return Linking.openURL(url.apple);
            } else {
              // Close sheet.
            }
          } catch (err) {
            alert("Hubo un problema abriendo la dirección."); // eslint-disable-line
          }
        }
      );
    } else {
      try {
        return Linking.openURL(url.google);
      } catch (err) {
        alert("Hubo un problema abriendo la dirección."); // eslint-disable-line
      }
    }
  };

  renderHeader = () => {
    const { hybrid, expanded, place, campus, placeIsCampus } = this.state;
    const initial = MapView.parseLocation(campus.location);
    const description = _.get(place, ["description", "brief"], false);
    const placeLocation = place && MapView.parseLocation(place.location);
    const shouldExpand = expanded && place;

    return (
      <Header>
        <MapView
          style={{ height: expanded ? 400 : 200 }}
          mapType={hybrid ? "hybrid" : "standard"}
          expanded={expanded}
          initial={initial}
          ref={ref => (this.map = ref)}
        >
          {place &&
            placeLocation &&
            <MapView.Marker
              coordinate={placeLocation}
              title={place.name}
              description={description || undefined}
            />}
        </MapView>
        <MapTypes onPress={this.handleMapType}>
          <MapTypesText>Estilo</MapTypesText>
        </MapTypes>
        {shouldExpand &&
          <PlaceContainer>
            <PlaceContent>
              <PlaceTitle>
                {place.name}
              </PlaceTitle>
              {placeIsCampus
                ? <PlaceDescription>
                    {MapView.parseAddress(campus.location)}
                  </PlaceDescription>
                : <PlaceDescription>
                    {description || "Sin más detalle."}
                  </PlaceDescription>}
            </PlaceContent>
            <TouchableOpacity onPress={() => this.handleExternal(place)}>
              <PlaceShare />
            </TouchableOpacity>
          </PlaceContainer>}
        <Button
          color="A"
          onPress={() => this.setState({ expanded: !expanded })}
        >
          <DownArrow name={expanded ? "ios-arrow-up" : "ios-arrow-down"} />
          <ButtonText color="Z">
            {expanded ? "Mostrar lista" : "Expandir mapa"}
          </ButtonText>
          <DownArrow name={expanded ? "ios-arrow-up" : "ios-arrow-down"} />
        </Button>
      </Header>
    );
  };

  renderSectionHeader = (sectionData, sectionID) =>
    <SubHeader key={`${sectionID}`}>
      <SubHeaderText>
        {(_.get(this.state.categories, [sectionID, "name"]) || "")
          .toUpperCase()}
      </SubHeaderText>
    </SubHeader>;

  renderRow = (item, section, row, highlight) =>
    <ListViewRowPlace
      item={item}
      row={row}
      highlight={highlight}
      onPress={() => this.handlePress(item, section)}
      first={Number(row) === 0}
      // last={this.state.dataSource.getRowCount() - 1 === Number(row)}
    />;

  renderEmpty = () => <Empty />;

  render = () => {
    const { error, refreshing } = this.props.campuses;
    const { expanded } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <ListView
            dataSource={expanded ? this.state.empty : this.state.dataSource}
            renderHeader={this.renderHeader}
            renderSectionHeader={
              expanded ? this.renderEmpty : this.renderSectionHeader
            }
            renderRow={expanded ? this.renderEmpty : this.renderRow}
            refreshing={refreshing}
            style={{ paddingTop: 0 }}
            renderEmpty={() =>
              <Loading>
                <Loading.Logo />
                <Loading.Text>
                  {refreshing ? "Cargando..." : "No hay lugares para mostrar"}
                </Loading.Text>
              </Loading>}
          />
        </Container>
      </Themed>
    );
  };
}
