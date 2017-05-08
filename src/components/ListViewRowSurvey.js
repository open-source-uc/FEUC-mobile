import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import get from "lodash/get";

import ListViewRow from "./ListViewRow";

const ListViewRowSurvey = ({ item, selection, row, ...props }) => (
  <ListViewRow
    background={Platform.OS === "android" && row % 2 ? "X" : "Z"}
    {...props}
  >
    <ListViewRow.Content>
      <ListViewRow.Title>{item.title}</ListViewRow.Title>
      <ListViewRow.Body>
        {get(item, "description.brief", "Sin descripción")}
      </ListViewRow.Body>
      {selection &&
        <ListViewRow.Footer>
          {get(item, ["options", String(selection.vote), "text"])}
        </ListViewRow.Footer>}
    </ListViewRow.Content>
    <ListViewRow.Disclosure />
  </ListViewRow>
);

ListViewRowSurvey.propTypes = {
  item: PropTypes.object.isRequired,
  selection: PropTypes.object,
  row: PropTypes.any.isRequired,
};

export default ListViewRowSurvey;
