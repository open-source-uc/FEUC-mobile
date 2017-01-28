import React from 'react';
import { View, StyleSheet } from 'react-native';

const MyContainer = ({ style, ...props }) => (
  <View style={[styles.container, style]} {...props} />
);

MyContainer.propTypes = View.propTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyContainer;
