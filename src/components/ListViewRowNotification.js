import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import get from "lodash/get";

import ListViewRow from "./ListViewRow";
import { images } from "../assets/";

function selectImage(item) {
  let uri = get(item, ["image", "secure_url"]);
  if (uri) return { uri };

  const kind = get(item, ["action", "kind"]);
  const related = get(item, ["action", kind]);

  uri = get(related, ["image", "secure_url"]);
  if (uri) return { uri };

  return images.default.notification;
}

const ListViewRowInitiative = ({ item, seen, ...props }) => (
  <ListViewRow background={seen ? "Z" : "selected"} {...props}>
    <ListViewRow.Thumbnail circle shadow source={selectImage(item)} />
    <ListViewRow.Content>
      <ListViewRow.Title>{item.title}</ListViewRow.Title>
      <ListViewRow.Body>
        {get(item, "description.brief", "Nueva notificación")}
      </ListViewRow.Body>
      <ListViewRow.Footer>
        {moment(item.publishedAt).fromNow()}
      </ListViewRow.Footer>
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
