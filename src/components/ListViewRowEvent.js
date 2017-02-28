import React, { PropTypes } from 'react';
import moment from 'moment';
import get from 'lodash/get';

import ListViewRow from './ListViewRow';
import { images } from '../assets/';


function selectImage(item) {
  let uri = get(item, 'image.secure_url');
  if (uri) return { uri };

  uri = get(item, ['organizer', item.organizer.kind, 'image', 'secure_url']);
  if (uri) return { uri };

  return images.default.benefit;
}


const ListViewRowBenefit = ({ item, ...props }) => {
  const start = moment(get(item, 'temporality.start')); // required
  const end = moment(get(item, 'temporality.end')); // required

  const isSameDay = start.isSame(end, 'day');
  const range = isSameDay ? [start] : [start, end];
  const display = isSameDay
    ? `${start.format('HH:mm')} - ${end.format('HH:mm')}`
    : `${start.format('HH:mm')} (${end.diff(start, 'days') + 1} días) - ${end.format('HH:mm')} hrs`;

  return (
    <ListViewRow
      background="Z"
      {...props}
    >
      <ListViewRow.Thumbnail blur source={selectImage(item)}>
        <ListViewRow.Thumbnail.Upper>
          {start.format('MMM').toUpperCase()}
        </ListViewRow.Thumbnail.Upper>
        <ListViewRow.Thumbnail.Main>
          {range.map(m => m.format('d')).join('-').toUpperCase()}
        </ListViewRow.Thumbnail.Main>
      </ListViewRow.Thumbnail>
      <ListViewRow.Content>
        <ListViewRow.Title>{item.title}</ListViewRow.Title>
        <ListViewRow.Body>
          {get(item, 'description.brief', item.subtitle)}
        </ListViewRow.Body>
        <ListViewRow.Footer>
          {display.toUpperCase()}
        </ListViewRow.Footer>
      </ListViewRow.Content>
      <ListViewRow.Disclosure />
    </ListViewRow>
  );
};

ListViewRowBenefit.propTypes = {
  item: PropTypes.object.isRequired,
  row: PropTypes.any.isRequired,
};

export default ListViewRowBenefit;
