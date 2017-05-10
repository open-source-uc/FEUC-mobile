import React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";

import ListViewRow from "./ListViewRow";
import { images } from "../assets/";

function selectImage(item) {
  const uri = get(item, "image.secure_url");
  if (uri) return { uri };

  return images.default.notification;
}

const ListViewRowInitiative = ({ item, seen, ...props }) => (
  <ListViewRow background={seen ? "Z" : "selected"} {...props}>
    <ListViewRow.Thumbnail circle shadow source={selectImage(item)} />
    <ListViewRow.Content>
      <ListViewRow.Title>{item.title || "Nuevo evento!"}</ListViewRow.Title>
      <ListViewRow.Body>
        {get(item, "description.brief", "Nuevo aviso")}
      </ListViewRow.Body>
      <ListViewRow.Footer>{item.title || "Hace un rato"}</ListViewRow.Footer>
    </ListViewRow.Content>
    <ListViewRow.Disclosure />
  </ListViewRow>
);

ListViewRowInitiative.propTypes = {
  item: PropTypes.object.isRequired,
  row: PropTypes.any.isRequired,
  seen: PropTypes.bool.isRequired,
};

export default ListViewRowInitiative;
