import React, { PropTypes, Component } from 'react';
import { Dimensions } from 'react-native';
import { Svg as SVG, Polygon } from 'react-native-svg';
import styled from 'styled-components/native';

import { Button, Tag, EventDate } from '../components/';
import Themed, { colors } from '../styles';

const temp = {
  default: 'http://www.joblo.com/posters/images/full/1982-pink-floyd-the-wall-poster1.jpg',
};


const Container = styled.View`
  background-color: ${props => props.theme.colors.black};
  position: absolute;
  top: -64;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Header = styled.View`
  background-color: ${props => props.theme.colors.black};
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 64;
  opacity: 0.7;
  z-index: 8192;
`;

const Banner = styled.Image`
  width: ${Dimensions.get('window').width};
  background-color: ${props => props.theme.colors.clear};
  resize-mode: cover;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 256;
  z-index: 2048;
`;

const BannerContent = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;

const StyledSVG = styled(SVG)`
  width: ${Dimensions.get('window').width};
  height: ${props => props.height};
`;

const ScrollView = styled.ScrollView`
  flex: 1;
  z-index: 4096;
`;

const Content = styled.View`
  background-color: ${props => props.theme.colors.white};
  margin-top: 256;
  padding: 0 0;
`;

const Row = styled.View`
  justify-content: flex-start;
  flex-direction: ${props => props.direction || 'row'};
  flex-wrap: wrap;
  align-items: center;
  padding-vertical: ${props => (props.vertical === 'fit' ? 0 : 5)};
  padding-horizontal: ${props => (props.fluid ? 0 : 18)};
`;

const View = styled.View`
  flex: 1;
  margin-top: 8;
`;

const Ttile = styled.Text`
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fonts.headers};
  font-size: 15;
  font-weight: 900;
`;

const SubTitle = styled.Text`
  font-family: ${props => props.theme.fonts.headers};
  color: ${props => props.theme.colors.black};
  font-size: 13;
  font-weight: 300;
`;

const AboutTitle = styled.Text`
  color: ${props => props.theme.colors.lightGray};
  font-family: ${props => props.theme.fonts.headers};
  font-size: 9;
  font-weight: 600;
  margin: 8 0 2;
`;

const AboutText = styled.Text`
  font-family: ${props => props.theme.fonts.main};
  color: ${props => props.theme.colors.gray};
  font-size: 12;
  font-weight: 400;
  line-height: 19;
`;

const ActionContainer = styled.TouchableOpacity`
  background-color: ${props => (props.theme.colors[props.background] || props.theme.colors.lightClear)};
  flex: 1;
  height: 44;
  justify-content: center;
  padding: 0 18;
`;

const ActionText = styled.Text`
  font-family: ${props => props.theme.fonts.main};
  color: ${props => props.theme.colors[props.color] || props.theme.colors.lightBlack};
`;


export default class Event extends Component {
  static navigationOptions = {
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      title: state.params ? state.params.title : 'EVENTO',
      style: {
        backgroundColor: 'transparent',
        zIndex: 16384, // Some high number, Infinity does not work.
      },
    }),
  }

  static propTypes = {
    navigation: PropTypes.any,
  }

  static defaultProps = {
    navigation: null,
  }

  state = {
    error: false,
  }

  render() {
    const { addded, title, subtitle, description, date, tags } = {
      title: 'Fiesta de bienvenida',
      subtitle: 'Semana novata',
      description: '',
      addded: false,
      tags: [
        { _id: '1', name: 'Categoria 2' },
        { _id: '2', name: 'Categoria 2' },
        { _id: '3', name: 'Categoria 2' },
      ],
      date: new Date(),
    };

    // Triangle dimensions
    const width = Dimensions.get('window').width;
    const height = 40;

    const points = [
      [0, height],
      [width, height],
      [width, 0],
    ];

    return (
      <Themed content="dark">
        <Container>
          <Header />
          <ScrollView>
            <Banner source={{ uri: temp.default }}>
              <BannerContent>
                <StyledSVG height={height}>
                  <Polygon
                    points={points.reduce((string, [x, y]) => `${string} ${x},${y}`, '')}
                    fill={colors.white}
                  />
                </StyledSVG>
                <EventDate date={date} />
              </BannerContent>
            </Banner>
            <Content>
              <Row>
                <View>
                  <Ttile>{title.toUpperCase()}</Ttile>
                  <SubTitle>{subtitle}</SubTitle>
                </View>
              </Row>
              <Row fluid vertical="fit">
                <Button color="white">
                  <Button.Icon color="main" name="ios-time-outline" />
                  <Button.Text color="gray">
                    19:00 - 22:00
                  </Button.Text>
                </Button>
                <Button color={addded ? 'white' : 'main'}>
                  <Button.Icon color={addded ? 'main' : 'white'} name="ios-calendar" />
                  <Button.Text color={addded ? 'main' : 'white'}>
                    Agregar a agenda
                  </Button.Text>
                </Button>
              </Row>
              <Row fluid>
                <Button color="white">
                  <Button.Icon color="main" name="ios-map-outline" />
                  <Button.Text color="gray">
                    Concha Acústica, Campus San Joaquín
                  </Button.Text>
                  <Button.Icon color="main" position="right" name="ios-arrow-forward" />
                </Button>
              </Row>
              <Row>
                <AboutTitle>
                  {'Sobre el evento'.toUpperCase()}
                </AboutTitle>
              </Row>
              <Row>
                <AboutText>
                  {description}
                </AboutText>
              </Row>
              <Row>
                {tags.map(tag => (
                  <Tag key={tag._id} name={tag.name} />
                ))}
              </Row>
              <Row fluid>
                <View>
                  <ActionContainer>
                    <ActionText>Entrada liberada</ActionText>
                  </ActionContainer>
                  <ActionContainer background="facebook">
                    <ActionText color="white">Facebook</ActionText>
                  </ActionContainer>
                  <ActionContainer background="twitter">
                    <ActionText color="white">Twitter</ActionText>
                  </ActionContainer>
                </View>
              </Row>
            </Content>
          </ScrollView>
        </Container>
      </Themed>
    );
  }
}
