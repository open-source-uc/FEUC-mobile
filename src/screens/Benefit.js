import React, { PropTypes, Component } from 'react';
import { Image, Dimensions } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import styled from 'styled-components/native';
import moment from 'moment';
import get from 'lodash/get';

import { Thumbnail, Button, ErrorBar, RichText } from '../components/';
import * as schemas from '../schemas';
import Themed, { colors } from '../styles';
import { images } from '../assets/';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const StyledParallaxScrollView = styled(ParallaxScrollView)`
  flex: 1;
  overflow: hidden;
`;

const Banner = styled.Image`
  resize-mode: ${Image.resizeMode.cover};
  height: ${props => props.height};
`;

const BrandImage = styled(Thumbnail)`
  top: -30;
`;

BrandImage.defaultProps = {
  circle: true,
};

const BrandTitle = styled.Text`
  color: ${props => props.theme.colors.C};
  text-align: center;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 700;
  font-size: 13;
  margin-top: 20;
  margin-bottom: 8;
`;

const Arc = styled.Image`
  position: absolute;
  overflow: visible;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  resize-mode: ${Image.resizeMode.contain};
  width: ${Dimensions.get('window').width};
  height: 26;
  top: -26;
`;

Arc.defaultProps = {
  source: images.arc,
};

const Title = styled.Text`
  color: ${props => props.theme.colors.G};
  text-align: center;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 500;
  font-size: 20;
  margin-bottom: 8;
`;

Title.defaultProps = {
  numberOfLines: 2,
};

const ActivatedCount = styled.Text`
  color: ${props => props.theme.colors.E};
  text-align: center;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 500;
  font-size: 10;
  margin-bottom: 1;
`;

const Considerations = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20;
`;

const ValidRange = styled.Text`
  color: ${props => props.theme.colors.E};
  text-align: center;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 500;
  font-size: 10;
  margin: 0 3;
`;

const Content = styled.View`
  padding: 18;
`;

const AboutTitle = styled.Text`
  font-family: ${props => props.theme.fonts.headers};
  color: ${props => props.theme.colors.A};
  font-size: 12;
  font-weight: 600;
  margin-bottom: 6;
`;

const AboutText = styled(RichText)`
  font-family: ${props => props.theme.fonts.body};
  color: ${props => props.theme.colors.E};
  font-size: 14;
  font-weight: 300;
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
    title: 'Beneficio',
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: 'Beneficio',
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

  renderBackground = () => {
    const { bannerHeight } = this.props;
    const { benefit } = this.state;

    const bannerSource = {
      uri: get(benefit, 'image.secure_url'),
    };

    return (
      <Banner height={bannerHeight} source={bannerSource} />
    );
  }

  render() {
    const { bannerHeight, error } = this.props;
    const { benefit } = this.state;

    const responsableSource = {
      uri: get(benefit, ['responsable', benefit.responsable.kind, 'image', 'secure_url']),
    };

    return (
      <Themed content="dark">
        <Container>
          <ErrorBar error={error} />
          {benefit && (
            <StyledParallaxScrollView
              contentBackgroundColor={colors.white}
              renderBackground={this.renderBackground}
              parallaxHeaderHeight={bannerHeight}
            >
              <Arc>
                <BrandImage source={responsableSource} />
              </Arc>
              <BrandTitle>
                {benefit.responsable[benefit.responsable.kind].name}
              </BrandTitle>
              <Title>
                {benefit.title}
              </Title>
              <ActivatedCount>
                {`${benefit.uses} dcts. activados`.toUpperCase()}
              </ActivatedCount>
              <Considerations>
                {benefit.benefit.limited && (
                  <ValidRange>
                    {`Solo ${benefit.benefit.stock} disponibles`}
                  </ValidRange>
                )}
                {benefit.benefit.limited && benefit.benefit.expires && (
                  <ValidRange>-</ValidRange>
                )}
                {benefit.benefit.expires && (
                  <ValidRange>
                    {`Válido hasta ${moment(benefit.benefit.deadline).toNow()}`}
                  </ValidRange>
                )}
              </Considerations>
              <Content>
                <AboutTitle>
                  Sobre el descuento
                </AboutTitle>
                <AboutText>
                  {get(benefit, 'description.full.md') || benefit.description.brief}
                </AboutText>
              </Content>
            </StyledParallaxScrollView>
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
