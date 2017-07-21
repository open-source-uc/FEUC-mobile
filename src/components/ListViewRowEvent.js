import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import get from "lodash/get";

import ListViewRow from "./ListViewRow";
import { images } from "../assets/";
import { getDateProperties } from "../utils/events";

function selectImage(item) {
  let uri = get(item, ["image", "secure_url"]);
  if (uri) return { uri };

  uri = get(item, ["organizer", item.organizer.kind, "image", "secure_url"]);
  if (uri) return { uri };

  return images.default.benefit;
}

const ListViewRowBenefit = ({ item, row, ...props }) => {
  const date = getDateProperties(item);

  return (
    <ListViewRow
      background={Platform.OS === "android" && row % 2 ? "X" : "Z"}
      {...props}
    >
      <ListViewRow.Thumbnail blur source={selectImage(item)}>
        <ListViewRow.Thumbnail.Upper small={date.months.length > 1}>
          {date.rangeMonth}
        </ListViewRow.Thumbnail.Upper>
        <ListViewRow.Thumbnail.Main small={date.days.length > 1}>
          {date.rangeDays}
        </ListViewRow.Thumbnail.Main>
      </ListViewRow.Thumbnail>
      <ListViewRow.Content>
        <ListViewRow.Title>
          {item.title}
        </ListViewRow.Title>
        <ListViewRow.Body>
          {get(item, "description.brief", item.subtitle)}
        </ListViewRow.Body>
        <ListViewRow.Footer>
          {date.range.toUpperCase()}
          {"    "}
          {Platform.OS === "android"
            ? [date.rangeMonth, date.rangeDays].join(", ")
            : ""}
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
