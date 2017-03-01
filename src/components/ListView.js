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
    const { refreshing, onRefresh, dataSource, ...props } = this.props;
    const separators = dataSource.getRowCount() - 1;

    return (
      <StyledListView
        dataSource={dataSource}
        renderSeparator={(section, row) => (
          row < separators && <Separator key={row} />
        )}
        refreshControl={onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined}
        {...props}
      />
    );
  }
}
