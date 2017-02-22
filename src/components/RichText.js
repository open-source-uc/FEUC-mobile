import React, { PropTypes } from 'react';
import Markdown from 'react-native-simple-markdown';
import styled from 'styled-components/native';
import has from 'lodash/has';


import { colors } from '../styles';


const MD = styled(Markdown)`
  margin: 0;
`;

const styles = {
  listItemBullet: {
    margin: 0,
  },
  a: {
    color: colors.main,
  },
  paragraph: {
    margin: 0,
  },
};


const RichText = ({ children, style: text, ...props }) => {
  if (has(children, 'md')) {
    return (
      <MD styles={{ ...styles, text }} {...props}>{children.md}</MD>
    );
  } else {
    return (
      <MD styles={{ ...styles, text }} {...props}>{children}</MD>
    );
  }
};

RichText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  style: PropTypes.any,
};

RichText.defaultProps = {
  children: '',
  style: undefined,
};

export default RichText;
