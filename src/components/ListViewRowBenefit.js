import React, { PropTypes } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import get from 'lodash/get';

import ListViewRow from './ListViewRow';
import { images } from '../assets/';
import { isExpired } from '../utils/benefits';


const FooterRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3;
`;

function selectImage(item) {
  let uri = get(item, 'thumbnail.secure_url');
  if (uri) return { uri };

  uri = get(item, ['responsable', item.responsable.kind, 'image', 'secure_url']);
  if (uri) return { uri };

  return images.default.benefit;
}


const ListViewRowBenefit = ({ item, row, ...props }) => {
  const { limited, stock, expires, deadline } = item.benefit;

  const didExpire = isExpired(item);

  const restrictions = [
    limited && `Quedan ${Math.max(0, Number(stock) - Number(item.uses))}`,
    expires && `Expiración ${moment(deadline).fromNow()}`,
    !limited && !expires && 'Disponible',
  ].filter(Boolean).map(s => s.toUpperCase());

  return (
    <ListViewRow
      background={Platform.OS === 'android' && row % 2 ? 'X' : 'Z'}
      {...props}
    >
      <ListViewRow.Thumbnail
        shadow
        circle
        source={selectImage(item)}
      />
      <ListViewRow.Content>
        <FooterRow>
          <ListViewRow.Footer color={didExpire.overall ? 'error' : 'B'}>
            {restrictions.join('  |  ')}
          </ListViewRow.Footer>
        </FooterRow>
        <ListViewRow.Title>{item.title}</ListViewRow.Title>
        <ListViewRow.Body>
          {item.description.brief || 'Sin descripción.'}
        </ListViewRow.Body>
        <ListViewRow.Footer>
          {`${item.uses} veces activado`.toUpperCase()}
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
