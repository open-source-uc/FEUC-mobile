import React, { Component } from "react";
import {
  Image,
  Platform,
  Dimensions,
  Animated,
  Easing,
  findNodeHandle,
} from "react-native";
import PropTypes from "prop-types";
import { BlurView } from "react-native-blur";
import Spinner from "react-native-spinkit";
import { connect } from "react-redux";
import { denormalize } from "normalizr";
import styled from "styled-components/native";
import get from "lodash/get";
import max from "lodash/max";
import moment from "moment";
import "moment-duration-format";

import { ErrorBar, Bookmark } from "../components/";
import * as schemas from "../schemas";
import Themed, { colors } from "../styles";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Background = styled(Animated.Image)`
  width: ${max(Object.values(Dimensions.get("window"))) * 1.2};
  height: ${max(Object.values(Dimensions.get("window"))) * 1.2};
  background-color: ${props => props.theme.colors.background};
`;

const Content = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

const Blurred = styled(BlurView)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

Blurred.defaultProps = {
  blurType: "dark",
  blurAmount: 50,
};

const Card = styled.View`
  background-color: ${props => props.theme.colors.Z};
  width: ${Dimensions.get("window").width * 0.75};
  border-radius: 10;
  height: 380;
  overflow: hidden;
`;

const Cover = styled.Image`
  flex: 14;
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
  flex: 7;
`;

const Center = styled.View`
  position: absolute;
  top: ${props => props.size / -2};
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

Center.defaultProps = {
  size: 30,
};

const Circle = styled.View`
  justify-content: center;
  align-items: center;
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size / 2};
  background-color: ${props => props.theme.colors.X};
`;

Circle.defaultProps = Center.defaultProps;

const BrandTitle = styled.Text`
  color: ${props => props.theme.colors.C};
  text-align: center;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 700;
  font-size: 10;
  margin-bottom: 5;
  margin-top: 25;
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
  const id = get(nav, ["routes", nav.index, "params", "_id"]);
  return {
    benefit: id ? denormalize(id, schemas.benefit, entities) : null,
  };
};

const mapDispatchToProps = null;

@connect(mapStateToProps, mapDispatchToProps)
export default class BenefitActive extends Component {
  static navigationOptions = {
    title: ({ state }) =>
      (state.params.raffle ? "Participando" : "Activado").toUpperCase(),
  };

  static propTypes = {
    benefit: PropTypes.object,
    error: PropTypes.object,
  };

  static defaultProps = {
    benefit: null,
    error: null,
  };

  state = {
    benefit: this.props.benefit,
    deadline: null,
    isInTime: false,
    timeleft: null,
    ready: false,
  };

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

  setupTimer = benefit => {
    if (this.timer) clearTimeout(this.timer);

    const deadline = benefit.benefit.expires && benefit.benefit.deadline;
    if (deadline) {
      this.timer = setInterval(() => {
        const now = moment();
        const diff = moment(deadline).diff(now, "seconds");
        const isInTime = diff > 0;
        const timeleft =
          isInTime && moment.duration(diff, "seconds").format("d[d] h:mm:ss");
        this.setState({ deadline, isInTime, timeleft, ready: true });
      }, 1000);
    } else {
      this.setState({ ready: true });
    }
  };

  startAnimation = () => {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 100,
      duration: 4000,
      easing: Easing.linear,
    }).start(this.startAnimation);
  };

  render() {
    const { error } = this.props;
    const { benefit, deadline, isInTime, timeleft, ready } = this.state;

    const spin = this.animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: ["0deg", "360deg"],
    });
    const transform = [{ rotate: spin }];

    const bannerSource = {
      uri: get(benefit, "banner.secure_url"),
    };

    return (
      <Themed content="dark">
        <Container>
          <Background
            source={bannerSource}
            style={Platform.OS === "ios" ? { transform } : null}
            innerRef={background => {
              this.background = background;
            }}
            onLoadEnd={() =>
              this.setState({ viewRef: findNodeHandle(this.background) })}
          >
            <Blurred viewRef={this.state.viewRef} />
          </Background>
          <ErrorBar error={error} />
          <Content>
            {benefit &&
              <Card>
                <Cover source={bannerSource}>
                  {benefit.benefit.expires &&
                  false && // TODO
                    <AbsoluteBookmark>
                      <Bookmark.Lead>NRO</Bookmark.Lead>
                      <Bookmark.Title>24</Bookmark.Title>
                    </AbsoluteBookmark>}
                </Cover>
                <Bottom>
                  <Center>
                    <Circle>
                      <Spinner type="Pulse" color={colors.B} size={35} />
                    </Circle>
                  </Center>
                  <BrandTitle>
                    {get(benefit, [
                      "responsable",
                      benefit.responsable.kind,
                      "name",
                    ])}
                  </BrandTitle>
                  <Title>
                    {benefit.title}
                  </Title>
                  {!ready &&
                    <Restriction>
                      Cargando...
                    </Restriction>}
                  {ready &&
                    deadline &&
                    isInTime &&
                    timeleft &&
                    <Restriction>
                      {`Valido por ${timeleft}`.toUpperCase()}
                    </Restriction>}
                  {ready &&
                    deadline &&
                    !isInTime &&
                    <Restriction>
                      Expirado
                    </Restriction>}
                </Bottom>
              </Card>}
          </Content>
        </Container>
      </Themed>
    );
  }
}
