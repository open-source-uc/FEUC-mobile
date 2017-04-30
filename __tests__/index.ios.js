import "react-native";
import React from "react";
import FEUC from "../src/FEUC";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<FEUC />);
  expect(tree).toBeTruthy();
});
