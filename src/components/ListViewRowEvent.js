import React, { PropTypes } from 'react';
import { Platform } from 'react-native';
import moment from 'moment';
import get from 'lodash/get';
import trim from 'lodash/trim';

import ListViewRow from './ListViewRow';
import { images } from '../assets/';


function selectImage(item) {
  let uri = get(item, 'image.secure_url');
  if (uri) return { uri };

  uri = get(item, ['organizer', item.organizer.kind, 'image', 'secure_url']);
  if (uri) return { uri };

  return images.default.benefit;
}


const ListViewRowBenefit = ({ item, row, ...props }) => {
  const start = moment(get(item, 'temporality.start')); // required
  const end = moment(get(item, 'temporality.end')); // required

  const isSameDay = start.isSame(end, 'day');
  const days = isSameDay ? [start] : [start, end];
  const isSameMonth = start.isSame(end, 'month');
  const months = isSameMonth ? [start] : [start, end];

  const display = isSameDay
    ? `${start.format('HH:mm')} - ${end.format('HH:mm')}`
    : `${start.format('HH:mm')} (${end.diff(start, 'days') + 1} días) - ${end.format('HH:mm')} hrs`;

  return (
    <ListViewRow
      background={Platform.OS === 'android' && row % 2 ? 'X' : 'Z'}
      {...props}
    >
      <ListViewRow.Thumbnail blur source={selectImage(item)}>
        <ListViewRow.Thumbnail.Upper small={months.length > 1}>
          {months.map(m => m.format('MMM'))
            .map(m => trim(m, '.'))
            .join(' - ')
            .toUpperCase()}
        </ListViewRow.Thumbnail.Upper>
        <ListViewRow.Thumbnail.Main small={days.length > 1}>
          {days.map(m => m.format('D'))
            .join('-')
            .toUpperCase()}
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
