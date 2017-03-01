import React, { PureComponent } from 'react';
import { ListView, StyleSheet, Platform } from 'react-native';
import styled from 'styled-components/native';

import RefreshControl from './RefreshControl';


export const Separator = styled.View`
  border-top-color: ${props => props.theme.colors.E};
  border-top-width: ${StyleSheet.hairlineWidth};
  margin-left: 18;
  height: 0;
`;

const Container = styled.View`
  flex: 1;
`;

const Back = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

const StyledListView = styled.ListView`
  padding-top: ${Platform.OS === 'ios' ? 28 : 0};
  background-color: ${props => props.theme.colors.transparent};
`;


export default class MyListView extends PureComponent {
  static Separator = Separator;
  static DataSource = ListView.DataSource;

  static propTypes = ListView.propTypes;

  static defaultProps = {
    ...ListView.defaultProps,
    contentInset: { bottom: 49 },
    automaticallyAdjustContentInsets: false,
    enableEmptySections: true,
    skipLastSeparator: true,
  };

  render() {
    const { refreshing, onRefresh, renderEmpty, dataSource, ...props } = this.props;
    const count = dataSource ? dataSource.getRowCount() : 0;
    const separators = count - 1;

    const ios = Platform.OS === 'ios';

    return (
      <Container>
        {renderEmpty && count === 0 && (
          <Back>
            {renderEmpty()}
          </Back>
        )}
        <StyledListView
          dataSource={dataSource}
          renderSeparator={(section, row) => (
            ios && (row < separators) && (
              <Separator key={row} />
            )
          )}
          refreshControl={onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined}
          {...props}
        />
      </Container>
    );
  }
}
