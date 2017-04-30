import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import { denormalize } from "normalizr";
import styled from "styled-components/native";
import moment from "moment";
import get from "lodash/get";
import noop from "lodash/noop";

import { Arc, Button, ErrorBar } from "../components/";
import { activateBenefit, fetchBenefit } from "../redux/modules/benefits";
import * as schemas from "../schemas";
import Themed from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const AboutTitle = styled.Text`
  font-family: ${props => props.theme.fonts.headers};
  color: ${props => props.theme.colors.A};
  font-size: 12;
  font-weight: 600;
  margin-bottom: 6;
`;

const Bottom = styled.View`
  height: 56;
`;

const ButtonText = styled(Button.Text)`
  text-align: center;
  font-size: 16;
  font-weight: 800;
`;

const mapStateToProps = ({ nav, entities, benefits }) => {
  const id = get(nav, ["routes", nav.index, "params", "benefitId"]);
  const activation = denormalize(benefits.saved, [schemas.activation], entities)
    .filter(Boolean)
    .find(act => get(act, "benefit._id") === id);

  return {
    benefit: id ? denormalize(id, schemas.benefit, entities) : null,
    status: benefits.status[id],
    activation,
  };
};

const mapDispatchToProps = {
  activateBenefit,
  fetchBenefit,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Benefit extends Component {
  static navigationOptions = {
    title: "Beneficio".toUpperCase(),
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: "Beneficio".toUpperCase(),
    }),
  };

  static propTypes = {
    navigation: PropTypes.object,
    activateBenefit: PropTypes.func,
    fetchBenefit: PropTypes.func,
    status: PropTypes.string,
    benefit: PropTypes.object,
    error: PropTypes.object,
    bannerHeight: PropTypes.number,
  };

  static defaultProps = {
    navigation: null,
    activateBenefit: noop,
    fetchBenefit: noop,
    status: null,
    benefit: null,
    error: null,
    bannerHeight: 230,
  };

  state = {
    benefit: this.props.benefit,
    status: this.props.status,
    email: "",
  };

  componentDidMount() {
    if (this.props.benefit) {
      this.props.fetchBenefit(this.props.benefit._id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { benefit, status } = nextProps;
    if (benefit) {
      this.setState({ benefit, status });
    }
  }

  handleActivate = () => {
    const { navigation } = this.props;
    const { benefit, status, email } = this.state;

    if (benefit && status !== "saved") {
      this.props.activateBenefit(benefit._id, { email });
    } else if (benefit && navigation) {
      navigation.navigate("BenefitActive", {
        benefitId: benefit._id,
        raffle: benefit.benefit.raffle,
      });
    }
  };

  render() {
    const { bannerHeight, error } = this.props;
    const { benefit, status } = this.state;

    const responsableSource = {
      uri: get(benefit, [
        "responsable",
        benefit.responsable.kind,
        "image",
        "secure_url",
      ]),
    };
    const bannerSource = {
      uri: get(benefit, "banner.secure_url"),
    };

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          {benefit &&
            <Arc bannerSource={bannerSource} bannerHeight={bannerHeight}>
              <Arc.ArcLayout>
                <Arc.BrandImage source={responsableSource} />
              </Arc.ArcLayout>
              <Arc.BrandTitle>
                {get(benefit, [
                  "responsable",
                  benefit.responsable.kind,
                  "name",
                ])}
              </Arc.BrandTitle>
              <Arc.Title>
                {benefit.title}
              </Arc.Title>
              <Arc.DropTexts>
                {benefit.benefit.limited &&
                  <Arc.DropText>
                    {`Solo ${benefit.benefit.stock} disponibles`}
                  </Arc.DropText>}
                {benefit.benefit.limited &&
                  <Arc.DropText>
                    {`${benefit.uses} personas lo han usado`}
                  </Arc.DropText>}
                {benefit.benefit.expires &&
                  <Arc.DropText>
                    {`Válido hasta ${moment(benefit.benefit.deadline).format("D/MM/YYY [a las] HH:mm")}`}
                  </Arc.DropText>}
              </Arc.DropTexts>
              <Arc.Content>
                <AboutTitle>
                  Sobre el descuento
                </AboutTitle>
                <Arc.Body>
                  {get(benefit, "description.full.md") ||
                    benefit.description.brief}
                </Arc.Body>
              </Arc.Content>
            </Arc>}
          {benefit &&
            <Bottom>
              <Button color="B" onPress={this.handleActivate}>
                <ButtonText color="Z">
                  {!status ? get(benefit, "messages.activate", "Activar") : ""}
                  {status === "loading"
                    ? get(benefit, "messages.loading", "Cargando...")
                    : ""}
                  {status === "saved"
                    ? get(benefit, "messages.open", "Abrir")
                    : ""}
                  {status === "error"
                    ? get(benefit, "messages.error", "Ocurrió un error :(")
                    : ""}
                </ButtonText>
              </Button>
            </Bottom>}
        </Container>
      </Themed>
    );
  }
}
