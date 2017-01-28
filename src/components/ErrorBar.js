import React, { PropTypes, PureComponent } from 'react';
import styled from 'styled-components/native';
import isError from 'lodash/fp/isError';
import get from 'lodash/fp/get';
import isString from 'lodash/fp/isString';


const Container = styled.View`
  background-color: ${get('theme.colors.error')};
  height: 44;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: bold;
`;


export default class ErrorBar extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    error: PropTypes.any,
  }

  static defaultProps = {
    children: null,
    error: null,
  }

  static errorToString = (error) => {
    if (isError(error)) {
      return error.toLocaleString();
    } else if (isString(error)) {
      return error;
    } else {
      console.warn('Do not how to render error:', error); // eslint-disable-line
      return error;
    }
  }

  render() {
    const { children, error, ...props } = this.props;

    // Return falsy (do not render) when there is no error.
    return error && (
      <Container {...props}>
        <Text>{ErrorBar.errorToString(error)}</Text>
        {children}
      </Container>
    );
  }
}
