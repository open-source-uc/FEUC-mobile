import React, { PropTypes, Component } from 'react';
import { Image } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import styled from 'styled-components/native';
import moment from 'moment';
import get from 'lodash/get';

import client from '../api-client';
import { Thumbnail, Button, ErrorBar, RichText } from '../components/';
import Themed, { colors } from '../styles';

const temp = {
  image: 'https://cdn-starbucks.netdna-ssl.com/uploads/images/_framed/HvSQZ0WW-4500-3000.JPG',
};


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

const BannerContent = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const BrandImage = styled(Thumbnail)`
  margin-bottom: 12;
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
  margin-bottom: 8;
`;

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


export default class Benefit extends Component {
  static navigationOptions = {
    title: 'FEUC',
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: 'Beneficio',
    }),
  }

  static propTypes = {
    navigation: PropTypes.object,
    bannerHeight: PropTypes.number,
  }

  static defaultProps = {
    navigation: null,
    bannerHeight: 230,
  }

  state = {
    benefit: null,
    refreshing: false,
    error: null,
    content: this.props.navigation.state.params.content,
  }

  componentDidMount() {
    const { navigation } = this.props;
    if (navigation && navigation.state.params) {
      this.fetchContent(navigation.state.params._id, { showRefresh: false });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { navigation } = nextProps;

    if (navigation && navigation.state.params.content) {
      this.setState({ content: nextProps.navigation.state.params.content });
    }
  }

  fetchContent = (identifier, options = { showRefresh: true }) => {
    this.setState({ refreshing: options.showRefresh });

    return client.benefit(identifier).then(
      benefit => this.setState({ refreshing: false, error: null, benefit }),
      error => this.setState({ refreshing: false, error }),
    );
  }

  handleActivate = () => {
    alert('ACTIVATE!');
  }

  renderBackground = () => {
    const { bannerHeight } = this.props;
    const { benefit } = this.state;
    const brand = benefit.responsable[benefit.responsable.kind];
    return (
      <Banner height={bannerHeight} source={{ uri: temp.image }}>
        <BannerContent>
          <BrandImage source={{ uri: get(brand, 'image.secure_url') }} />
        </BannerContent>
      </Banner>
    );
  }

  render() {
    const { bannerHeight } = this.props;
    const { benefit, error } = this.state;

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
                  {benefit.description}
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
