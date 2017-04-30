import React, { PropTypes } from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";
import get from "lodash/get";

import ListViewRow from "./ListViewRow";
import { images } from "../assets/";

const Text = styled.Text`
  color: ${props => props.theme.colors.B};
  font-weight: 600;
  margin-right: 10;
  text-align: right;
`;

const ListViewRowAttendance = ({ item, row, ...props }) => {
  const uri = get(item, ["image", "secure_url"]);

  return (
    <ListViewRow
      background={Platform.OS === "android" && row % 2 ? "X" : "Z"}
      {...props}
    >
      <ListViewRow.Thumbnail
        shadow
        circle
        source={uri ? { uri } : images.default.attendance}
      />
      <ListViewRow.Content>
        <ListViewRow.Title>{item.name}</ListViewRow.Title>
        <ListViewRow.Footer color="E">
          {get(item, "movement", "").toUpperCase()}
        </ListViewRow.Footer>
        <ListViewRow.Body>
          {get(item, "description.brief", "Sin descripción.")}
        </ListViewRow.Body>
      </ListViewRow.Content>
      <Text>
        {item.percentage}%
      </Text>
    </ListViewRow>
  );
};

ListViewRowAttendance.propTypes = {
  item: PropTypes.object.isRequired,
  row: PropTypes.any.isRequired,
};

export default ListViewRowAttendance;
