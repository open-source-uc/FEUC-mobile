import React, { PropTypes, Component } from 'react';
import { ListView } from 'react-native';
import styled from 'styled-components/native';

import { ListViewRow, ListViewSeparator, ErrorBar } from '../components/';
import Themed from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const StyledListView = styled.ListView`
  padding-top: 18;
`;

const Text = styled.Text`

`;


export default class More extends Component {
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
      { text: 'Notificaciones', screen: 'Notifications' },
      { text: 'Mis Eventos', screen: 'MyEvents' },
      { text: 'Contacto', screen: 'Contact' },
    ],
  }

  state = {
    error: false,
    items: More.DataSource.cloneWithRows(this.props.items),
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
      <Themed content="dark">
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
