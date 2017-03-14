import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import styled from 'styled-components/native';
import noop from 'lodash/noop';
import get from 'lodash/get';

import { ListViewRowBenefit, ListView, Loading, ErrorBar } from '../components/';
import { fetchBenefitsSaved } from '../redux/modules/benefits';
import * as schemas from '../schemas';
import { isExpired } from '../utils/benefits';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;


const mapStateToProps = state => ({
  error: state.benefits.error,
  refreshing: state.benefits.refreshing,
  activated: denormalize(state.benefits.saved, [schemas.activation], state.entities),
});

const mapDispatchToProps = ({
  fetchBenefitsSaved,
});

@connect(mapStateToProps, mapDispatchToProps)
export default class BenefitsSaved extends Component {
  static propTypes = {
    // benefits: PropTypes.array,
    activated: PropTypes.array,
    error: PropTypes.object,
    refreshing: PropTypes.bool,
    navigation: PropTypes.object,

    fetchBenefitsSaved: PropTypes.func,
  }

  static defaultProps = {
    activated: [],
    error: null,
    refreshing: false,
    navigation: null,

    fetchBenefitsSaved: noop,
  }

  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1._id !== r2._id,
  })

  state = {
    dataSource: this.constructor.DataSource.cloneWithRows(this.props.activated),
  }

  componentDidMount = () => {
    this.fetchBenefitsSaved();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activated) {
      this.setState({
        dataSource: this.constructor.DataSource.cloneWithRows(nextProps.activated),
      });
    }
  }

  handlePress = (item, activation = {}) => {
    const { navigation } = this.props;

    const expiredBy = isExpired(item);
    if (activation.valid || !expiredBy.overall) {
      navigation.navigate('Benefit', { benefitId: item._id, title: item.title });
    } else {
      alert('Ya no está disponible.'); // eslint-disable-line
    }
  }

  fetchBenefitsSaved = () => {
    const ids = this.props.activated.map(act => get(act, 'benefit._id'));
    this.props.fetchBenefitsSaved(ids);
  }

  renderRow = (activation, section, row, highlight) => {
    const item = activation.benefit;

    return (
      <ListViewRowBenefit
        item={item}
        activation={activation}
        row={row}
        highlight={highlight}
        onPress={() => this.handlePress(item, activation)}
        first={Number(row) === 0}
        last={this.state.dataSource.getRowCount() - 1 === Number(row)}
      />
    );
  }

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
            onRefresh={this.fetchBenefitsSaved}
            renderEmpty={() => (
              <Loading>
                <Loading.Logo />
                <Loading.Text>
                  {refreshing ? 'Cargando...' : 'Sin descuentos por el momento, vuelve pronto a revisar ;)'}
                </Loading.Text>
              </Loading>
            )}
          />
        </Container>
      </Themed>
    );
  }
}
