import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import get from "lodash/get";

import ListViewRow from "./ListViewRow";

const ListViewRowInitiative = ({ item, row, ...props }) =>
  <ListViewRow
    background={Platform.OS === "android" && row % 2 ? "X" : "Z"}
    {...props}
  >
    <ListViewRow.Content>
      <ListViewRow.Title>
        {item.name}
      </ListViewRow.Title>
      <ListViewRow.Body numberOfLines={2}>
        {get(item, ["description", "brief"]) || "Sin más detalle."}
      </ListViewRow.Body>
    </ListViewRow.Content>
  </ListViewRow>;

ListViewRowInitiative.propTypes = {
  item: PropTypes.object.isRequired,
  row: PropTypes.any.isRequired,
};

export default ListViewRowInitiative;
