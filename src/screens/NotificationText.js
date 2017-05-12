import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components/native";
import get from "lodash/get";

import { RichText } from "../components/";
import Themed from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 18;
`;

const Body = styled(RichText)`
  font-family: ${props => props.theme.fonts.body};
  color: ${props => props.theme.colors.E};
  font-size: 14;
  font-weight: 400;
`;

const mapStateToProps = ({ nav }) => ({
  text: get(nav, ["routes", nav.index, "params", "text"]),
});

const mapDispatchToProps = null;

@connect(mapStateToProps, mapDispatchToProps)
export default class NotificationText extends Component {
  static propTypes = {
    text: PropTypes.object,
  };

  // TODO: not working
  // static navigationOptions = ({ navigation }) => ({
  //   title: (navigation.state.params.title || "Notificación").toUpperCase(),
  // });

  render() {
    return (
      <Themed content="dark">
        <Container>
          <Body>
            {this.props.text}
          </Body>
        </Container>
      </Themed>
    );
  }
}
