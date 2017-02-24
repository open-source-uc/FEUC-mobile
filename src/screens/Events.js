import React, { PropTypes, Component } from 'react';
import styled from 'styled-components/native';
import get from 'lodash/get';

import client from '../api-client';
import { ListViewRow, ErrorBar, ListView } from '../components/';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;


export default class Events extends Component {
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
    dataSource: this.constructor.DataSource.cloneWithRows(this.props.items),
  }

  componentWillMount() {
    this.fetchContent({ showRefresh: false });
  }

  fetchContent = (options = { showRefresh: true }) => {
    this.setState({ refreshing: options.showRefresh });

    return client.events({ qs: {} })
      .then(items => this.constructor.DataSource.cloneWithRows(items))
      .then(
        dataSource => this.setState({ refreshing: false, error: null, dataSource }),
        error => this.setState({ refreshing: false, error }),
      );
  }

  handlePress = (item) => {
    const { navigation } = this.props;

    if (item && navigation) {
      navigation.navigate('Event', { _id: item._id, title: item.title });
    }
  }

  renderRow = (item, section, row, highlight) => (
    <ListViewRow
      background={row % 2 === 0 ? 'Z' : 'D'}
      onPress={() => this.handlePress(item)}
      highlight={highlight}
    >
      <ListViewRow.Thumbnail source={{ uri: get(item, 'image.secure_url') }} />
      <ListViewRow.Content>
        <ListViewRow.Title>{item.title}</ListViewRow.Title>
        <ListViewRow.Body>
          {item.description.brief}
        </ListViewRow.Body>
      </ListViewRow.Content>
      <ListViewRow.Disclosure />
    </ListViewRow>
  )

  render = () => {
    const { dataSource, error, refreshing } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}
            refreshing={refreshing}
            onRefresh={this.fetchContent}
          />
        </Container>
      </Themed>
    );
  }
}
