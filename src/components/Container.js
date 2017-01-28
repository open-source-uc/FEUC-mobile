import React from 'react';
import { Container } from 'native-base';
import light from '../themes/light';

const ThemedContainer = props => (
  <Container {...props} />
);

ThemedContainer.propTypes = Container.propTypes;
ThemedContainer.defaultProps = {
  theme: light,
};

export default ThemedContainer;
