import React, { PropTypes, Component } from 'react';
import { StyleSheet, ListView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { denormalize } from 'normalizr';
import styled from 'styled-components/native';
import noop from 'lodash/noop';

import { Loading, ErrorBar } from '../components/';
import { fetchEvents } from '../redux/modules/events';
import * as schemas from '../schemas';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.B};
`;

const Top = styled.View`
  height: 60;
`;

const Cell = styled.View`
  height: ${() => Dimensions.get('window').width / 3};
  width: ${() => Dimensions.get('window').width / 3};
  border-right-width: ${StyleSheet.hairlineWidth};
  border-bottom-width: ${StyleSheet.hairlineWidth};
  border-color: ${props => props.theme.colors.Y};
`;

const CellTouch = styled.TouchableOpacity`
  background-color: ${props => (props.selected ? props.theme.colors.C : 'transparent')};
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CellIcon = styled(Ionicons)`
  color: ${props => (props.selected ? props.theme.colors.Z : props.theme.colors.Y)};
  font-size: 40;
`;

const CellText = styled.Text`
  color: ${props => (props.selected ? props.theme.colors.Z : props.theme.colors.Y)};
  font-family: ${props => props.theme.fonts.main};
  font-size: 13;
  font-weight: 400;
`;

const Grid = styled(ListView)`
  background-color: transparent;
  margin-top: 10;
  flex: 10;
`;

Grid.defaultProps = {
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
};

const Title = styled.Text`
  color: ${props => props.theme.colors.Z};
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

const CampusScroll = styled.ScrollView`
  margin: 15 0;
`;

CampusScroll.defaultProps = {
  horizontal: true,
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const CampusCircle = styled.TouchableOpacity`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size / 2};
  background-color: ${props => (props.selected ? props.theme.colors.Z : '#00000077')};
  justify-content: center;
  align-items: center;
  margin: 0 10;
`;

CampusCircle.defaultProps = {
  size: 40,
};

const CampusCircleText = styled.Text`
  color: ${props => (props.selected ? props.theme.colors.C : props.theme.colors.G)};
  font-size: 18;
`;

const CurrentCampus = styled.View`
  height: 36;
  background-color: #3B9085;
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
  events: state.events,
  entities: state.entities,
});

const mapDispatchToProps = ({
  fetchEvents,
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchView extends Component {
  static propTypes = {
    events: PropTypes.object,
    entities: PropTypes.object, // eslint-disable-line
    // navigation: PropTypes.object,
    campuses: PropTypes.array,

    fetchEvents: PropTypes.func,
  }

  static defaultProps = {
    events: {},
    entities: {},
    // navigation: null,
    campuses: [{
      _id: 1,
      name: 'San Joaquín',
      short: 'SJ',
    }, {
      _id: 2,
      name: 'Lo Contador',
      short: 'LC',
    }, {
      _id: 3,
      name: 'Lo Contador',
      short: 'LC',
    }],
    fetchEvents: noop,
  }

  static denormalize = ({ events, entities }) => {
    const schema = [schemas.event];
    return denormalize(events.result, schema, entities);
  }

  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1._id !== r2._id,
  })

  state = {
    selectedTags: {},
    selectedCampus: 2,
    dataSource: this.constructor.DataSource.cloneWithRows(this.constructor.denormalize(this.props)),
  }

  componentDidMount = () => {
    this.props.fetchEvents();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entities && nextProps.events) {
      const items = this.constructor.denormalize(nextProps);
      this.setState({ dataSource: this.constructor.DataSource.cloneWithRows(items) });
    }
  }

  handleItemSelection = (item) => {
    const selectedTags = {
      ...this.state.selectedTags,
      [item._id]: !this.state.selectedTags[item._id],
    };
    this.setState({ selectedTags });
  }

  handleCampusSelection = (item) => {
    this.setState(state => ({
      selectedCampus: state.selectedCampus === item._id ? null : item._id,
    }));
  }

  renderRow = (item) => {
    const { selectedTags } = this.state;

    return (
      <Cell selected={selectedTags[item._id]}>
        <CellTouch selected={selectedTags[item._id]} onPress={() => this.handleItemSelection(item)}>
          <CellIcon selected={selectedTags[item._id]} name="ios-map" />
          <CellText selected={selectedTags[item._id]}>Deportes</CellText>
        </CellTouch>
      </Cell>
    );
  }

  render = () => {
    const { events: { error, refreshing }, campuses } = this.props;
    const { dataSource, selectedCampus } = this.state;

    const campus = campuses.find(c => c._id === selectedCampus);

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <Top>

          </Top>
          <Title>Busca por categorías</Title>
          <Grid
            dataSource={dataSource}
            renderRow={this.renderRow}
            refreshing={refreshing}
            onRefresh={this.props.fetchEvents}
            renderEmpty={() => (
              <Loading>
                <Loading.Logo />
                <Loading.Text>
                  {refreshing ? 'Cargando...' : 'No hay etiquetas para mostrar.'}
                </Loading.Text>
              </Loading>
            )}
          />
          <Bottom>
            <Title>Busca por campus</Title>
            <CampusScroll>
              {campuses.map(c => (
                <CampusCircle
                  key={c._id}
                  selected={c._id === selectedCampus}
                  onPress={() => this.handleCampusSelection(c)}
                >
                  <CampusCircleText>{c.short}</CampusCircleText>
                </CampusCircle>
              ))}
            </CampusScroll>
            <CurrentCampus>
              <CurrentCampusText>
                {campus ? campus.name.toUpperCase() : 'Todos los campus'}
              </CurrentCampusText>
            </CurrentCampus>
          </Bottom>
        </Container>
      </Themed>
    );
  }
}
