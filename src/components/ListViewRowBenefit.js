import React, { PropTypes } from 'react';
import has from 'lodash/has';
import styled from 'styled-components/native';

import ListViewRow from './ListViewRow';
import { images } from '../assets/';


const FooterRow = styled.View`
  flex-direction: row;
  ${''/* justify-content: space-between; */}
  align-items: center;
  margin-top: 3;
`;


const ListViewRowBenefit = ({ item, row, ...props }) => (
  <ListViewRow
    background={row % 2 === 0 ? 'Z' : 'Z'}
    {...props}
  >
    <ListViewRow.Thumbnail
      shadow
      circle
      source={has(item, 'image.secure_url') ? { uri: item.image.secure_url } : images.default.benefit}
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
        {`${item.uses} veces activado`.toUpperCase()}
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
