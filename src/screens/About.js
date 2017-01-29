import React, { PropTypes, Component } from 'react';
import { ListView } from 'react-native';
import styled from 'styled-components/native';
import pick from 'lodash/pick';

import client from '../utils/fetcher';
import { ListViewRow, ListViewSeparator, ErrorBar, TabBarIcon } from '../components/';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
`;

const StyledListView = styled.ListView`
  padding-top: 18;
`;

const Text = styled.Text`

`;


export default class About extends Component {
  static navigationOptions = {
    title: 'FEUC',
    tabBar: {
      label: 'FEUC',
      icon: props => <TabBarIcon.About {...props} />,
    },
  }
  static DataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.key !== r2.key,
  })

  static propTypes = {
    navigation: PropTypes.any,
    mapping: PropTypes.object,
    items: PropTypes.array,
    transparence: PropTypes.object,
  }

  static defaultProps = {
    navigation: null,
    mapping: {
      whoarewe: 'AboutDetail',
      council: 'AboutDetail',
      speakeroffices: 'AboutDetail',
      transparence: 'Transparence',
    },
    items: [],
    transparence: { key: 'transparence', title: 'Transparencia' },
  }

  state = {
    refreshing: false,
    error: false,
    items: About.DataSource.cloneWithRows(this.props.items),
  }

  componentDidMount = () => {
    this.fetchContent();
  }

  fetchContent = () => {
    this.setState({ refreshing: true });

    return client.information()
      .then(items => About.DataSource.cloneWithRows([...items, this.props.transparence]))
      .then(
        items => this.setState({ refreshing: false, error: null, items }),
        error => this.setState({ refreshing: false, error }),
      );
  }

  handlePress = (item) => {
    const { navigation, mapping } = this.props;

    if (navigation && mapping[item.key]) {
      const args = pick(item, ['_id', 'key', 'title', 'content']);
      navigation.navigate(mapping[item.key], args);
    } else {
      alert(item._id) // eslint-disable-line
    }
  }

  render() {
    const { items, error } = this.state;

    return (
      <Themed>
        <Container>
          <ErrorBar error={error} />
          <StyledListView
            dataSource={items}
            enableEmptySections
            renderRow={item => (
              <ListViewRow onPress={() => this.handlePress(item)}>
                <Text>{item.title}</Text>
              </ListViewRow>
            )}
            renderSeparator={(section, row) => (
              <ListViewSeparator key={row} />
            )}
          />
        </Container>
      </Themed>
    );
  }
}
