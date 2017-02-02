import React, { PropTypes } from 'react';
import Markdown from 'react-native-simple-markdown';
import styled from 'styled-components/native';

import { colors } from '../styles';


const MD = styled(Markdown)``;

const styles = {
  listItemBullet: {
    margin: 0,
  },
  a: {
    color: colors.main,
  },
};


const RichText = ({ children, ...props }) => (
  <MD styles={styles} {...props}>{children.md || children}</MD>
);

RichText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

RichText.defaultProps = {
  children: '',
};

export default RichText;
