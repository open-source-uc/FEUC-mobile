import React, { PropTypes, Component } from 'react';
import { ListView } from 'react-native';
import styled from 'styled-components/native';

import client from '../api-client';
import { ListViewRow, ListViewSeparator, ErrorBar, RefreshControl, RichText } from '../components/';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const StyledListView = styled.ListView`
  padding-top: 18;
`;

const Title = styled.Text`
  font-weight: bold;
  margin: 10 0 0;
`;

const Image = styled.Image`
  height: 30;
  width: 30;
  margin-right: 12;
`;

const RowContent = styled.View`
  flex: 1;
  margin: 10 0;
`;


export default class Benefits extends Component {
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
    items: Benefits.DataSource.cloneWithRows(this.props.items),
  }

  componentDidMount = () => {
    this.fetchContent({ showRefresh: false });
  }

  fetchContent = (options = { showRefresh: true }) => {
    this.setState({ refreshing: options.showRefresh });

    return client.benefits()
      .then(items => Benefits.DataSource.cloneWithRows(items))
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
                <RowContent>
                  <Title>{item.name}</Title>
                  <RichText>{item.description}</RichText>
                </RowContent>
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
