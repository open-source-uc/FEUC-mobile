import React, { PropTypes, Component } from 'react';
import { ListView } from 'react-native';
import styled from 'styled-components/native';

import client from '../api-client';
import { ListViewRowBenefit, ErrorBar, RefreshControl } from '../components/';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const StyledListView = styled.ListView`

`;


export default class MyBenefits extends Component {
  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1._id !== r2._id,
  })

  static propTypes = {
    navigation: PropTypes.object,
    items: PropTypes.array,
  }

  static defaultProps = {
    navigation: null,
    items: [],
  }

  state = {
    refreshing: false,
    error: false,
    items: this.constructor.DataSource.cloneWithRows(this.props.items),
  }

  componentDidMount = () => {
    this.fetchContent({ showRefresh: false });
  }

  fetchContent = (options = { showRefresh: true }) => {
    this.setState({ refreshing: options.showRefresh });

    return client.benefits()
      .then(items => this.constructor.DataSource.cloneWithRows(items))
      .then(
        items => this.setState({ refreshing: false, error: null, items }),
        error => this.setState({ refreshing: false, error }),
      );
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
    const { items, error, refreshing } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <StyledListView
            dataSource={items}
            enableEmptySections
            renderRow={this.renderRow}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.fetchContent}
              />
            }
          />
        </Container>
      </Themed>
    );
  }
}
