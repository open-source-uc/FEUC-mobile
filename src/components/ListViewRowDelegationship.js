import React, { PropTypes } from 'react';
// import styled from 'styled-components/native';
import get from 'lodash/get';

import ListViewRow from './ListViewRow';
import { images } from '../assets/';


function selectImage(item) {
  const uri = get(item, 'image.secure_url');
  if (uri) return { uri };

  return images.default.benefit;
}


const ListViewRowDelegationship = ({ item, row, ...props }) => (
  <ListViewRow
    background="Z"
    {...props}
  >
    <ListViewRow.Thumbnail tint={item.color} background="transparent" source={images.logo.transparent} />
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
