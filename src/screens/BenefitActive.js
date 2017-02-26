import React, { PropTypes, Component } from 'react';
import { Image, Dimensions, Animated, Easing } from 'react-native';
import { BlurView } from 'react-native-blur';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import styled from 'styled-components/native';
import get from 'lodash/get';
import max from 'lodash/max';
import moment from 'moment';
import 'moment-duration-format';

import { ErrorBar, Bookmark } from '../components/';
import * as schemas from '../schemas';
import Themed from '../styles';

const temp = {
  image: 'https://cdn-starbucks.netdna-ssl.com/uploads/images/_framed/HvSQZ0WW-4500-3000.JPG',
};


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Background = styled(Animated.Image)`
  width: ${max(Object.values(Dimensions.get('window')))};
  height: ${max(Object.values(Dimensions.get('window')))};
  background-color: ${props => props.theme.colors.background};
`;

const Blurred = styled(BlurView)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  resize-mode: ${Image.resizeMode.cover};
`;

Blurred.defaultProps = {
  blurType: 'dark',
  blurAmount: 50,
};

const Card = styled.View`
  background-color: ${props => props.theme.colors.Z};
  width: ${Dimensions.get('window').width * 0.75};
  border-radius: 10;
  height: 380;
  overflow: hidden;
`;

const Cover = styled.Image`
  flex: 7;
  resize-mode: ${Image.resizeMode.cover};
  border-top-left-radius: 10;
  border-top-right-radius: 10;
`;

const AbsoluteBookmark = styled(Bookmark)`
  position: absolute;
  right: 12;
  top: -4;
`;

const Bottom = styled.View`
  flex: 3;
`;

const BrandTitle = styled.Text`
  color: ${props => props.theme.colors.C};
  text-align: center;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 700;
  font-size: 10;
  margin-bottom: 5;
  margin-top: 20;
  padding: 0 18;
`;

BrandTitle.defaultProps = {
  numberOfLines: 1,
};

const Title = styled.Text`
  flex: 1;
  color: ${props => props.theme.colors.G};
  text-align: center;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 700;
  font-size: 16;
  margin-bottom: 8;
  padding: 0 18;
`;

Title.defaultProps = {
  numberOfLines: 2,
};

const Restriction = styled.Text`
  color: ${props => props.theme.colors.A};
  text-align: center;
  font-family: ${props => props.theme.fonts.body};
  font-weight: 700;
  font-size: 12;
  padding: 0 18;
  margin-bottom: 12;
`;


const mapStateToProps = ({ nav, entities }) => {
  const id = get(nav, ['routes', nav.index, 'params', 'benefitId']);
  return {
    benefit: id ? denormalize(id, schemas.benefit, entities) : null,
  };
};

const mapDispatchToProps = null;

@connect(mapStateToProps, mapDispatchToProps)
export default class BenefitActive extends Component {
  static navigationOptions = {
    title: 'Beneficio Activado!',
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
    }),
  }

  static propTypes = {
    benefit: PropTypes.object,
    error: PropTypes.object,
  }

  static defaultProps = {
    benefit: null,
    error: null,
  }

  state = {
    benefit: this.props.benefit,
    deadline: null,
    isInTime: false,
    timeleft: null,
    ready: false,
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.startAnimation();
    this.setupTimer(this.props.benefit);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.benefit) {
      this.setState({ benefit: nextProps.benefit, ready: false });
      this.setupTimer(nextProps.benefit);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  setupTimer = (benefit) => {
    if (this.timer) clearTimeout(this.timer);

    const deadline = benefit.benefit.expires && benefit.benefit.deadline;
    if (deadline) {
      this.timer = setInterval(() => {
        const now = moment();
        const diff = moment(deadline).diff(now, 'seconds');
        const isInTime = diff > 0;
        const timeleft = isInTime && moment.duration(diff, 'seconds').format('d[d] h:mm:ss');
        this.setState({ deadline, isInTime, timeleft, ready: true });
      }, 1000);
    }
  }

  startAnimation = () => {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 100,
      duration: 4000,
      easing: Easing.linear,
    }).start(this.startAnimation);
  }

  render() {
    const { error } = this.props;
    const { benefit, deadline, isInTime, timeleft, ready } = this.state;

    const spin = this.animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg'],
    });
    const transform = [{ rotate: spin }];

    const source = { uri: temp.image };

    return (
      <Themed content="dark">
        <Container>
          <Background source={source} style={{ transform }} />
          <ErrorBar error={error} />
          <Blurred>
            {benefit && (
              <Card>
                <Cover source={source}>
                  {benefit.benefit.expires && (
                    <AbsoluteBookmark>
                      <Bookmark.Lead>NRO</Bookmark.Lead>
                      <Bookmark.Title>24</Bookmark.Title>
                    </AbsoluteBookmark>
                  )}
                </Cover>
                <Bottom>
                  <BrandTitle>
                    {benefit.responsable[benefit.responsable.kind].name}
                  </BrandTitle>
                  <Title>
                    {benefit.title}
                  </Title>
                  {!ready && (
                    <Restriction>
                      Cargando...
                    </Restriction>
                  )}
                  {deadline && isInTime && timeleft && (
                    <Restriction>
                      {`Valido por ${timeleft}`.toUpperCase()}
                    </Restriction>
                  )}
                  {deadline && !isInTime && (
                    <Restriction>
                      Expirado
                    </Restriction>
                  )}
                </Bottom>
              </Card>
            )}
          </Blurred>
        </Container>
      </Themed>
    );
  }
}
