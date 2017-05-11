import React from "react";
import PropTypes from "prop-types";
import Markdown from "react-native-simple-markdown";
import styled from "styled-components/native";
import has from "lodash/has";

import { colors, fonts } from "../styles";

const MD = styled(Markdown)`
  margin: 0;
`;

const styles = {
  listItemBullet: {
    margin: 0,
    marginRight: 5,
  },
  a: {
    color: colors.B,
  },
  list: {
    marginTop: 6,
  },
  paragraph: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: "justify",
  },
  heading: {
    marginTop: 6,
    marginBottom: 10,
  },
  text: {
    fontFamily: fonts.body,
    color: colors.G,
  },
};

const RichText = ({ children, ...props }) => {
  if (has(children, "md")) {
    return <MD styles={{ ...styles }} {...props}>{children.md}</MD>;
  } else {
    return <MD styles={{ ...styles }} {...props}>{children}</MD>;
  }
};

RichText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.any,
};

RichText.defaultProps = {
  children: "",
  style: undefined,
};

export default RichText;
