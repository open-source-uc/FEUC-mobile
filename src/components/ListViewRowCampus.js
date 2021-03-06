import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import get from "lodash/get";

import ListViewRow from "./ListViewRow";
import MapView from "./MapView";
import { images } from "../assets/";

function selectImage(item) {
  const uri = get(item, ["image", "secure_url"]);
  if (uri) return { uri };

  return images.default.benefit;
}

const ListViewRowInitiative = ({ item, row, ...props }) =>
  <ListViewRow
    background={Platform.OS === "android" && row % 2 ? "X" : "Z"}
    {...props}
  >
    <ListViewRow.Thumbnail circle shadow source={selectImage(item)} />
    <ListViewRow.Content>
      <ListViewRow.Title>
        {item.name}
      </ListViewRow.Title>
      <ListViewRow.Body>
        {MapView.parseAddress(item.location)}
      </ListViewRow.Body>
    </ListViewRow.Content>
    <ListViewRow.Disclosure />
  </ListViewRow>;

ListViewRowInitiative.propTypes = {
  item: PropTypes.object.isRequired,
  row: PropTypes.any.isRequired,
};

export default ListViewRowInitiative;
