import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import styled from 'styled-components/native';
import noop from 'lodash/noop';

import { ListViewRowBenefit, ErrorBar, ListView } from '../components/';
import { fetchBenefits } from '../redux/modules/benefits';
import * as schemas from '../schemas';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;


const mapStateToProps = state => ({
  benefits: state.benefits,
  entities: state.entities,
});

const mapDispatchToProps = ({
  fetchBenefits,
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Benefits extends Component {
  static propTypes = {
    benefits: PropTypes.object,
    entities: PropTypes.object, // eslint-disable-line
    navigation: PropTypes.object,

    fetchBenefits: PropTypes.func,
  }

  static defaultProps = {
    benefits: {},
    entities: {},
    navigation: null,

    fetchBenefits: noop,
  }

  static denormalize = ({ benefits, entities }) => {
    const schema = [schemas.benefit];
    return denormalize(benefits.result, schema, entities);
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
    if (nextProps.entities && nextProps.benefits) {
      const items = this.constructor.denormalize(nextProps);
      this.setState({ dataSource: this.constructor.DataSource.cloneWithRows(items) });
    }
  }

  handlePress = (item) => {
    const { navigation } = this.props;

    if (item && navigation) {
      navigation.navigate('Benefits', { benefitId: item._id, title: item.title });
    }
  }

  renderRow = (item, section, row, highlight) => (
    <ListViewRowBenefit
      item={item}
      row={row}
      highlight={highlight}
      onPress={() => this.handlePress(item)}
      first={Number(row) === 0}
      last={this.state.dataSource.getRowCount() - 1 === Number(row)}
    />
  )

  render = () => {
    const { error, refreshing } = this.props.benefits;
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
