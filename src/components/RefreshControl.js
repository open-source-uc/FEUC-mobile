import styled from "styled-components/native";

import { colors } from "../styles";

// See: https://facebook.github.io/react-native/docs/refreshcontrol.html
const RefreshControl = styled.RefreshControl`

`;

RefreshControl.defaultProps = {
  tintColor: colors.A,
  colors: [colors.A], // Android
};

export default RefreshControl;
