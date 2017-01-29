import React, { PropTypes } from 'react';
import { Linking, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';
import styled from 'styled-components/native';

import { colors } from '../styles';

const ScrollView = styled.ScrollView`
`;


const styles = StyleSheet.create({
  a: {
    color: colors.main,
  },
});

const HTML = ({ children, ...props }) => (
  <ScrollView>
    <HTMLView
      value={children}
      stylesheet={styles}
      onLinkPress={url => Linking.openURL.call(Linking, url)}
      {...props}
    />
  </ScrollView>
);

HTML.propTypes = {
  children: PropTypes.string,
};

HTML.defaultProps = {
  children: '',
};

export default HTML;
