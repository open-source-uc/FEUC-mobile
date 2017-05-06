/* eslint react/display-name: 0 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";

import { colors } from "../styles";
import { images } from "../assets/";

const TabBarIcon = styled.Image`
  height: ${props => props.size};
  width: ${props => props.size};
  tint-color: ${props => props.tintColor};
`;

TabBarIcon.propTypes = {
  tintColor: PropTypes.any.isRequired,
  focused: PropTypes.bool.isRequired,
  size: PropTypes.number,
};

TabBarIcon.defaultProps = {
  tintColor: colors.A,
  size: 22,
};

TabBarIcon.Events = props => (
  <TabBarIcon source={images.nav.events} {...props} />
);

TabBarIcon.Community = props => (
  <TabBarIcon source={images.nav.community} {...props} />
);

TabBarIcon.About = props => <TabBarIcon source={images.nav.feuc} {...props} />;

TabBarIcon.Benefits = props => (
  <TabBarIcon source={images.nav.benefit} {...props} />
);

export default TabBarIcon;
