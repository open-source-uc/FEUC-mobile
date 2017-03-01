import React, { PropTypes } from 'react';
import { Image, Platform } from 'react-native';
import get from 'lodash/get';
import trimStart from 'lodash/trimStart';

import ListViewRow from './ListViewRow';
import { images } from '../assets/';


const ListViewRowDelegationship = ({ item, row, ...props }) => (
  <ListViewRow
    background={Platform.OS === 'android' && row % 2 ? 'X' : 'Z'}
    {...props}
  >
    <ListViewRow.Thumbnail
      mode={Image.resizeMode.contain}
      tint={`#${trimStart(item.color, '#')}`}
      background="transparent"
      source={images.logo.transparent}
    />
    <ListViewRow.Content>
      <ListViewRow.Title>{item.name}</ListViewRow.Title>
      <ListViewRow.Body>
        {get(item, 'description.brief', item.subtitle)}
      </ListViewRow.Body>
    </ListViewRow.Content>
    <ListViewRow.Disclosure />
  </ListViewRow>
);

ListViewRowDelegationship.propTypes = {
  item: PropTypes.object.isRequired,
  row: PropTypes.any.isRequired,
};

export default ListViewRowDelegationship;
