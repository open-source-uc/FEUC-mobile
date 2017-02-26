import React, { PropTypes } from 'react';
// import styled from 'styled-components/native';
import get from 'lodash/get';

import ListViewRow from './ListViewRow';
import { images } from '../assets/';


function selectImage(item) {
  let uri = get(item, 'thumbnail.secure_url');
  if (uri) return { uri };

  uri = get(item, ['organizer', item.organizer.kind, 'image', 'secure_url']);
  if (uri) return { uri };

  return images.default.benefit;
}


const ListViewRowBenefit = ({ item, row, ...props }) => (
  <ListViewRow
    background="Z"
    {...props}
  >
    <ListViewRow.Thumbnail source={selectImage(item)} />
    <ListViewRow.Content>
      <ListViewRow.Title>{item.title}</ListViewRow.Title>
      <ListViewRow.Body>
        {get(item, 'description.brief', item.subtitle)}
      </ListViewRow.Body>
    </ListViewRow.Content>
    <ListViewRow.Disclosure />
  </ListViewRow>
);

ListViewRowBenefit.propTypes = {
  item: PropTypes.object.isRequired,
  row: PropTypes.any.isRequired,
};

export default ListViewRowBenefit;
