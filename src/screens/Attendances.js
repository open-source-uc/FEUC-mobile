import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import styled from 'styled-components/native';
import noop from 'lodash/noop';

import { ListView, ListViewRowAttendance, Loading, ErrorBar } from '../components/';
import { fetchAttendances } from '../redux/modules/attendances';
import * as schemas from '../schemas';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;


const mapStateToProps = state => ({
  attendances: state.attendances,
  entities: state.entities,
});

const mapDispatchToProps = ({
  fetchAttendances,
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Attendances extends Component {
  static navigationOptions = {
    title: 'Libro Asistencia'.toUpperCase(),
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
    }),
  }

  static propTypes = {
    attendances: PropTypes.object,
    entities: PropTypes.object, // eslint-disable-line

    fetchAttendances: PropTypes.func,
  }

  static defaultProps = {
    attendances: {},
    entities: {},

    fetchAttendances: noop,
  }

  static denormalize = ({ attendances, entities }) => {
    const schema = [schemas.attendance];
    return denormalize(attendances.result, schema, entities);
  }

  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1._id !== r2._id,
  })

  state = {
    dataSource: this.constructor.DataSource.cloneWithRows(this.constructor.denormalize(this.props)),
  }

  componentDidMount = () => {
    this.props.fetchAttendances();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entities && nextProps.attendances) {
      const items = this.constructor.denormalize(nextProps);
      this.setState({ dataSource: this.constructor.DataSource.cloneWithRows(items) });
    }
  }

  handlePress = (item) => { // eslint-disable-line
    // TODO
  }

  renderRow = (item, section, row, highlight) => (
    <ListViewRowAttendance
      item={item}
      row={row}
      highlight={highlight}
      onPress={() => this.handlePress(item)}
      first={Number(row) === 0}
      last={this.state.dataSource.getRowCount() - 1 === Number(row)}
    />
  )

  render = () => {
    const { error, refreshing } = this.props.attendances;
    const { dataSource } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}
            refreshing={refreshing}
            onRefresh={this.props.fetchAttendances}
            renderEmpty={() => (
              <Loading>
                <Loading.Logo />
                <Loading.Text>
                  {refreshing ? 'Cargando...' : 'No hay items que mostrar.'}
                </Loading.Text>
              </Loading>
            )}
          />
        </Container>
      </Themed>
    );
  }
}
