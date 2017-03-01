import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import styled from 'styled-components/native';
import moment from 'moment';
import get from 'lodash/get';

import { Arc, Button, ErrorBar } from '../components/';
import * as schemas from '../schemas';
import Themed from '../styles';


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


const mapStateToProps = ({ nav, entities }) => {
  const id = get(nav, ['routes', nav.index, 'params', 'benefitId']);
  return {
    benefit: id ? denormalize(id, schemas.benefit, entities) : null,
  };
};

const mapDispatchToProps = null;

@connect(mapStateToProps, mapDispatchToProps)
export default class Benefit extends Component {
  static navigationOptions = {
    title: 'Beneficio'.toUpperCase(),
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: 'Beneficio'.toUpperCase(),
    }),
  }

  static propTypes = {
    navigation: PropTypes.object,
    benefit: PropTypes.object,
    error: PropTypes.object,
    bannerHeight: PropTypes.number,
  }

  static defaultProps = {
    navigation: null,
    benefit: null,
    error: null,
    bannerHeight: 230,
  }

  state = {
    benefit: this.props.benefit,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.benefit) {
      this.setState({ benefit: nextProps.benefit });
    }
  }

  handleActivate = () => {
    const { benefit, navigation } = this.props;

    if (benefit && navigation) {
      navigation.navigate('BenefitActive', { benefitId: benefit._id, title: 'Activado' });
    }
  }

  render() {
    const { bannerHeight, error } = this.props;
    const { benefit } = this.state;

    const responsableSource = {
      uri: get(benefit, ['responsable', benefit.responsable.kind, 'image', 'secure_url']),
    };
    const bannerSource = {
      uri: get(benefit, 'banner.secure_url'),
    };

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          {benefit && (
            <Arc bannerSource={bannerSource} bannerHeight={bannerHeight}>
              <Arc.ArcLayout>
                <Arc.BrandImage source={responsableSource} />
              </Arc.ArcLayout>
              <Arc.BrandTitle>
                {benefit.responsable[benefit.responsable.kind].name}
              </Arc.BrandTitle>
              <Arc.Title>
                {benefit.title}
              </Arc.Title>
              <Arc.Lead>
                {/* {`${benefit.uses} dcts. activados`.toUpperCase()} */}
              </Arc.Lead>
              <Arc.DropTexts>
                {benefit.benefit.limited && (
                  <Arc.DropText>
                    {`Solo ${benefit.benefit.stock} disponibles`}
                  </Arc.DropText>
                )}
                {benefit.benefit.limited && benefit.benefit.expires && (
                  <Arc.DropText>-</Arc.DropText>
                )}
                {benefit.benefit.expires && (
                  <Arc.DropText>
                    {`Válido hasta ${moment(benefit.benefit.deadline).toNow()}`}
                  </Arc.DropText>
                )}
              </Arc.DropTexts>
              <Arc.Content>
                <AboutTitle>
                  Sobre el descuento
                </AboutTitle>
                <Arc.Body>
                  {get(benefit, 'description.full.md') || benefit.description.brief}
                </Arc.Body>
              </Arc.Content>
            </Arc>
          )}
          {benefit && (
            <Bottom>
              <Button color="B" onPress={this.handleActivate}>
                <ButtonText color="Z">
                  Activar
                </ButtonText>
              </Button>
            </Bottom>
          )}
        </Container>
      </Themed>
    );
  }
}
