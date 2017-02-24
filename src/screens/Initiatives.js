import React, { PropTypes, Component } from 'react';
import styled from 'styled-components/native';
import has from 'lodash/has';

import client from '../api-client';
import { ListViewRow, ErrorBar, ListView } from '../components/';
import Themed from '../styles';
import { images } from '../assets/';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;


export default class Initiatives extends Component {
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

  componentDidMount = () => {
    this.fetchContent({ showRefresh: false });
  }

  fetchContent = (options = { showRefresh: true }) => {
    this.setState({ refreshing: options.showRefresh });

    return client.initiatives()
      .then(items => this.constructor.DataSource.cloneWithRows(items))
      .then(
        dataSource => this.setState({ refreshing: false, error: null, dataSource }),
        error => this.setState({ refreshing: false, error }),
      );
  }

  handlePress = (item) => {
    const { navigation } = this.props;

    if (item && navigation) {
      navigation.navigate('Community', { _id: item._id, title: item.name });
    }
  }

  renderRow = (item, section, row, highlight) => (
    <ListViewRow
      background={row % 2 === 0 ? 'Z' : 'X'}
      onPress={() => this.handlePress(item)}
      highlight={highlight}
    >
      <ListViewRow.Thumbnail
        shadow
        circle
        source={has(item, 'image.secure_url') ? { uri: item.image.secure_url } : images.default.initiative}
      />
      <ListViewRow.Content>
        <ListViewRow.Title>{item.name}</ListViewRow.Title>
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
