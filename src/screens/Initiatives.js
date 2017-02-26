import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import styled from 'styled-components/native';
import noop from 'lodash/noop';

import { ErrorBar, ListView, ListViewRowInitiative } from '../components/';
import { fetchInitiatives } from '../redux/modules/initiatives';
import * as schemas from '../schemas';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;


const mapStateToProps = state => ({
  initiatives: state.initiatives,
  entities: state.entities,
});

const mapDispatchToProps = ({
  fetchInitiatives,
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Initiatives extends Component {
  static propTypes = {
    initiatives: PropTypes.object,
    entities: PropTypes.object, // eslint-disable-line
    navigation: PropTypes.object,

    fetchInitiatives: PropTypes.func,
  }

  static defaultProps = {
    initiatives: {},
    entities: {},
    navigation: null,

    fetchInitiatives: noop,
  }

  static denormalize = ({ initiatives, entities }) => {
    const schema = [schemas.initiative];
    return denormalize(initiatives.result, schema, entities);
  }

  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1._id !== r2._id,
  })

  state = {
    dataSource: this.constructor.DataSource.cloneWithRows(this.constructor.denormalize(this.props)),
  }

  componentDidMount = () => {
    this.props.fetchInitiatives();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entities && nextProps.initiatives) {
      const items = this.constructor.denormalize(nextProps);
      this.setState({ dataSource: this.constructor.DataSource.cloneWithRows(items) });
    }
  }

  handlePress = (item) => {
    const { navigation } = this.props;

    if (item && navigation) {
      navigation.navigate('Initiative', { initiativeId: item._id, title: item.name });
    }
  }

  renderRow = (item, section, row, highlight) => (
    <ListViewRowInitiative
      item={item}
      row={row}
      highlight={highlight}
      onPress={() => this.handlePress(item)}
      first={Number(row) === 0}
      last={this.state.dataSource.getRowCount() - 1 === Number(row)}
    />
  )

  render = () => {
    const { error, refreshing } = this.props.initiatives;
    const { dataSource } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}
            refreshing={refreshing}
            onRefresh={this.props.fetchInitiatives}
          />
        </Container>
      </Themed>
    );
  }
}
