import React, { PropTypes, Component } from 'react';
import { ListView } from 'react-native';
import styled from 'styled-components/native';

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
    rowHasChanged: (r1, r2) => r1.id !== r2.id,
  })

  static propTypes = {
    navigation: PropTypes.any,
    items: PropTypes.array,
  }

  static defaultProps = {
    navigation: null,
    items: [
      { text: '¿Quiénes somos?', screen: 'WhoAreWe' },
      { text: 'Consejo FEUC', screen: 'Council' },
      { text: 'Transparencia', screen: 'Transparence' },
      { text: 'Vocalías', screen: 'SpeakerOffices' },
    ],
  }

  state = {
    error: false,
    items: About.DataSource.cloneWithRows(this.props.items),
  }

  handlePress = (item) => {
    if (this.props.navigation && item.screen) {
      this.props.navigation.navigate(item.screen);
    } else {
      alert(item.text) // eslint-disable-line
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
                <Text>{item.text}</Text>
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
