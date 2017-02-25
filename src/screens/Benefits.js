import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import styled from 'styled-components/native';
import noop from 'lodash/noop';

import { ListViewRowBenefit, ErrorBar, ListView } from '../components/';
import { fetchBenefits } from '../redux/modules/datastore';
import * as schemas from '../schemas';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;


const mapStateToProps = state => state.datastore.benefits;

const mapDispatchToProps = ({
  fetchBenefits,
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Benefits extends Component {
  static propTypes = {
    result: PropTypes.array, // eslint-disable-line
    entities: PropTypes.object, // eslint-disable-line
    refreshing: PropTypes.bool,
    error: PropTypes.object,

    fetchBenefits: PropTypes.func,
    navigation: PropTypes.object,
  }

  static defaultProps = {
    result: [],
    entities: {},
    refreshing: false,
    error: null,

    fetchBenefits: noop,
    navigation: null,
  }

  static denormalize = ({ result, entities: benefits }) => {
    const entities = { benefits };
    return denormalize(result, [schemas.benefit], entities);
  }

  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1._id !== r2._id,
  })

  state = {
    dataSource: this.constructor.DataSource.cloneWithRows(this.constructor.denormalize(this.props)),
  }

  componentDidMount = () => {
    this.props.fetchBenefits();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entities && nextProps.result) {
      const items = this.constructor.denormalize(nextProps);
      this.setState({ dataSource: this.constructor.DataSource.cloneWithRows(items) });
    }
  }

  handlePress = (item) => {
    const { navigation } = this.props;

    if (item && navigation) {
      navigation.navigate('Benefit', { _id: item._id, title: item.title });
    }
  }

  renderRow = (item, section, row, highlight) => (
    <ListViewRowBenefit
      item={item}
      row={row}
      highlight={highlight}
      onPress={() => this.handlePress(item)}
    />
  )

  render = () => {
    const { error, refreshing } = this.props;
    const { dataSource } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}
            refreshing={refreshing}
            onRefresh={this.props.fetchBenefits}
          />
        </Container>
      </Themed>
    );
  }
}
