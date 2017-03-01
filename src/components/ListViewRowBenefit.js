import React, { PropTypes } from 'react';
import styled from 'styled-components/native';
import get from 'lodash/get';

import ListViewRow from './ListViewRow';
import { images } from '../assets/';


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


const ListViewRowBenefit = ({ item, row, ...props }) => (
  <ListViewRow
    background="Z"
    {...props}
  >
    <ListViewRow.Thumbnail
      shadow
      circle
      source={selectImage(item)}
    />
    <ListViewRow.Content>
      <FooterRow>
        <ListViewRow.Footer>
          {(item.benefit.limited ? `Quedan ${item.benefit.stock - item.usage}` : 'ilimitado').toUpperCase()}
        </ListViewRow.Footer>
        <ListViewRow.Footer>
          {(item.benefit.expires ? '   |  🕝 hasta el 2017' : '').toUpperCase()}
        </ListViewRow.Footer>
      </FooterRow>
      <ListViewRow.Title>{item.title}</ListViewRow.Title>
      <ListViewRow.Body>
        {item.description.brief}
      </ListViewRow.Body>
      <ListViewRow.Footer>
        {/* {`${item.uses} veces activado`.toUpperCase()} */}
      </ListViewRow.Footer>
    </ListViewRow.Content>
    <ListViewRow.Disclosure />
  </ListViewRow>
);

ListViewRowBenefit.propTypes = {
  item: PropTypes.object.isRequired,
  row: PropTypes.any.isRequired,
};

export default ListViewRowBenefit;
