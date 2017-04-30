import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import { denormalize } from "normalizr";
import styled from "styled-components/native";
import noop from "lodash/noop";

import {
  ListView,
  ListViewRowDelegationship,
  Loading,
  ErrorBar,
} from "../components/";
import { fetchDelegationships } from "../redux/modules/delegationships";
import * as schemas from "../schemas";
import Themed from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const mapStateToProps = state => ({
  delegationships: state.delegationships,
  entities: state.entities,
});

const mapDispatchToProps = {
  fetchDelegationships,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Delegationships extends Component {
  static propTypes = {
    delegationships: PropTypes.object,
    entities: PropTypes.object, // eslint-disable-line
    navigation: PropTypes.object,

    fetchDelegationships: PropTypes.func,
  };

  static defaultProps = {
    delegationships: {},
    entities: {},
    navigation: null,

    fetchDelegationships: noop,
  };

  static denormalize = ({ delegationships, entities }) => {
    const schema = [schemas.delegationship];
    return denormalize(delegationships.result, schema, entities).filter(
      item => !item.hidden
    );
  };

  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1._id !== r2._id,
  });

  state = {
    dataSource: this.constructor.DataSource.cloneWithRows(
      this.constructor.denormalize(this.props)
    ),
  };

  componentDidMount = () => {
    this.props.fetchDelegationships();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.entities && nextProps.delegationships) {
      const items = this.constructor.denormalize(nextProps);
      this.setState({
        dataSource: this.constructor.DataSource.cloneWithRows(items),
      });
    }
  }

  handlePress = item => {
    const { navigation } = this.props;

    if (item && navigation) {
      navigation.navigate("Delegationship", {
        delegationshipId: item._id,
        title: item.name,
      });
    }
  };

  renderRow = (item, section, row, highlight) => (
    <ListViewRowDelegationship
      item={item}
      row={row}
      highlight={highlight}
      onPress={() => this.handlePress(item)}
      first={Number(row) === 0}
      last={this.state.dataSource.getRowCount() - 1 === Number(row)}
    />
  );

  render = () => {
    const { error, refreshing } = this.props.delegationships;
    const { dataSource } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}
            refreshing={refreshing}
            onRefresh={this.props.fetchDelegationships}
            renderEmpty={() => (
              <Loading>
                <Loading.Logo />
                <Loading.Text>
                  {refreshing ? "Cargando..." : "No hay vocalías para mostrar"}
                </Loading.Text>
              </Loading>
            )}
          />
        </Container>
      </Themed>
    );
  };
}
