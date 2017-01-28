import { Platform } from 'react-native';
import styled from 'styled-components/native';


const ListViewRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0 15;
  height: ${Platform.OS === 'ios' ? 44 : 48};
`;

export default ListViewRow;
