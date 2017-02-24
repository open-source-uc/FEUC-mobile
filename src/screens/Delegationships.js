import React, { PropTypes, Component } from 'react';
import { ListView } from 'react-native';
import styled from 'styled-components/native';

import client from '../api-client';
import { ListViewRow, ErrorBar, RefreshControl } from '../components/';
import Themed from '../styles';
import { images } from '../assets/';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const StyledListView = styled.ListView`

`;


export default class Delegationships extends Component {
  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1._id !== r2._id,
  })

  static propTypes = {
    navigation: PropTypes.object,
    items: PropTypes.array,
    image: PropTypes.any,
  }

  static defaultProps = {
    navigation: null,
    items: [],
    image: images.logo.transparent,
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

    return client.delegationships()
      .then(items => this.constructor.DataSource.cloneWithRows(items))
      .then(
        items => this.setState({ refreshing: false, error: null, items }),
        error => this.setState({ refreshing: false, error }),
      );
  }

  handlePress = (item) => {
    const { navigation } = this.props;

    if (item && navigation) {
      navigation.navigate('Delegationship', { _id: item._id, title: item.name });
    }
  }

  renderRow = (item, section, row, highlight) => (
    <ListViewRow
      background={row % 2 === 0 ? 'lightClear' : 'white'}
      onPress={() => this.handlePress(item)}
      highlight={highlight}
    >
      <ListViewRow.Thumbnail source={this.props.image} tint={item.color} background="transparent" />
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
