import React, { PropTypes, Component } from 'react';
import { ListView } from 'react-native';
import styled from 'styled-components/native';

import client from '../utils/fetcher';
import { ListViewRow, ListViewSeparator, ErrorBar, RefreshControl, TabBarIcon } from '../components/';
import Themed from '../styles';
import { defaults } from '../Navigator';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const StyledListView = styled.ListView`
  padding-top: 18;
`;

const Text = styled.Text`
  text-align: left;
  flex: 1;
`;

const Image = styled.Image`
  height: 30;
  width: 30;
  margin-right: 12;
`;


export default class Community extends Component {
  static navigationOptions = {
    title: 'FEUC',
    tabBar: {
      label: 'Comunidad',
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
    items: Community.DataSource.cloneWithRows(this.props.items),
  }

  componentDidMount = () => {
    this.fetchContent();
  }

  fetchContent = () => {
    this.setState({ refreshing: true });

    return client.communities()
      .then(items => Community.DataSource.cloneWithRows(items))
      .then(
        items => this.setState({ refreshing: false, error: null, items }),
        error => this.setState({ refreshing: false, error }),
      );
  }

  handlePress = (item) => {
    alert(item._id) // eslint-disable-line
  }

  render() {
    const { items, error, refreshing } = this.state;

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          <StyledListView
            dataSource={items}
            enableEmptySections
            renderRow={item => (
              <ListViewRow onPress={() => this.handlePress(item)}>
                <Image source={{ uri: item.image.secure_url }} />
                <Text>{item.name}</Text>
              </ListViewRow>
            )}
            renderSeparator={(section, row) => (
              <ListViewSeparator key={row} />
            )}
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
