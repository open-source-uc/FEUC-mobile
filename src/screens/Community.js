import React, { PropTypes, Component } from 'react';
import { ListView } from 'react-native';
import styled from 'styled-components/native';

import fetcher from '../utils/fetcher';
import { ListViewRow, ListViewSeparator, ErrorBar, RefreshControl, TabBarIcon } from '../components/';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
`;

const StyledListView = styled.ListView`
  padding-top: 18;
`;

const Text = styled.Text`

`;


export default class Community extends Component {
  static navigationOptions = {
    title: 'FEUC',
    tabBar: {
      label: 'Comunidad',
      icon: props => <TabBarIcon.Community {...props} />,
    },
  }

  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.id !== r2.id,
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

    const url = '';
    return fetcher(url).then(
      items => this.setState({ refreshing: false, error: null, items }),
      error => this.setState({ refreshing: false, error }),
    );
  }

  handlePress = (item) => {
    alert(item.id) // eslint-disable-line
  }

  render() {
    const { items, error, refreshing } = this.state;

    return (
      <Themed>
        <Container>
          <ErrorBar error={error} />
          <StyledListView
            dataSource={items}
            enableEmptySections
            renderRow={item => (
              <ListViewRow onPress={() => this.handlePress(item)}>
                <Text>{item.text}</Text>
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
