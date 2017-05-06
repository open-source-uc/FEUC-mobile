import "react-native";
import React from "react";
import renderer from "react-test-renderer"; // Note: test renderer must be required after react-native.

import FEUC from "../src/FEUC";

it("renders correctly", () => {
  const tree = renderer.create(<FEUC />);
  expect(tree).toBeDefined();
});
