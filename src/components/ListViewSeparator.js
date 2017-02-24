import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';


const ListViewSeparator = styled.View`
  border-top-color: ${props => props.theme.colors.E};
  border-top-width: ${StyleSheet.hairlineWidth};
  margin-left: 18;
  height: 0;
`;

export default ListViewSeparator;
