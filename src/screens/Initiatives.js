import React, { PropTypes, Component } from 'react';
import { ListView } from 'react-native';
import styled from 'styled-components/native';

import client from '../utils/fetcher';
import { ListViewRow, ErrorBar, RefreshControl, TabBarIcon } from '../components/';
import Themed from '../styles';
import { defaults } from '../Navigator';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const StyledListView = styled.ListView`

`;


export default class Initiatives extends Component {
  static navigationOptions = {
    title: 'FEUC',
    tabBar: {
      label: 'Iniciativas UC'.toUpperCase(),
      icon: props => <TabBarIcon.Community {...props} />,
    },
    header: () => ({
      ...defaults.navigator.header,
    }),
  }

  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1._id !== r2._id,
  })

  static propTypes = {
    items: PropTypes.array,
  }

  static defaultProps = {
    items: [],
  }

  state = {
    refreshing: false,
    error: false,
    items: Initiatives.DataSource.cloneWithRows(this.props.items),
  }

  componentDidMount = () => {
    this.fetchContent({ showRefresh: false });
  }

  fetchContent = (options = { showRefresh: true }) => {
    this.setState({ refreshing: options.showRefresh });

    return client.communities()
      .then(items => Initiatives.DataSource.cloneWithRows([...items, ...items, ...items]))
      .then(
        items => this.setState({ refreshing: false, error: null, items }),
        error => this.setState({ refreshing: false, error }),
      );
  }

  handlePress = (item) => {
    alert(item._id) // eslint-disable-line
  }

  renderRow = (item, section, row, highlight) => (
    <ListViewRow
      background={row % 2 === 0 ? 'lightClear' : 'white'}
      onPress={() => this.handlePress(item)}
      highlight={highlight}
    >
      <ListViewRow.Thumbnail source={{ uri: item.image.secure_url }} />
      <ListViewRow.Content>
        <ListViewRow.Title>{item.name}</ListViewRow.Title>
        <ListViewRow.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Unc et augue porttitor sodales diam.
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
