import React, { PureComponent } from "react";
import { Image, Dimensions } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components/native";

import Thumbnail from "./Thumbnail";
import RichText from "./RichText";
// import { colors } from '../styles';
import { images } from "../assets/";

const StyledParallaxScrollView = styled.ScrollView`
  flex: 1;
  overflow: hidden;
  background-color: ${props => props.theme.colors.Z};
`;

const Banner = styled.Image`
  resize-mode: ${Image.resizeMode.cover};
  height: ${props => props.height};
  background-color: ${props => props.theme.colors.F};
  flex-direction: column;
  justify-content: flex-end;
`;

const BrandImage = styled(Thumbnail)`
  margin-top: -37;
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

const ArcLayout = styled.Image`
  overflow: visible;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  resize-mode: ${Image.resizeMode.cover};
  width: ${Dimensions.get("window").width};
  height: 35;
`;

ArcLayout.defaultProps = {
  source: images.arc,
};

const Title = styled.Text`
  color: ${props => props.theme.colors.G};
  text-align: center;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 500;
  font-size: 20;
  margin: 0 18 8;
`;

Title.defaultProps = {
  numberOfLines: 2,
};

const Lead = styled.Text`
  color: ${props => props.theme.colors.E};
  text-align: center;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 500;
  font-size: 10;
  margin-bottom: 1;
`;

const DropTexts = styled.View`
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20;
  padding: 0 30;
`;

const DropText = styled.Text`
  color: ${props => props.theme.colors.E};
  text-align: center;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 500;
  font-size: 10;
  margin: 0 3;
`;

const Content = styled.View`
  padding: 18 18 36;
`;

const Body = styled(RichText)`
  font-family: ${props => props.theme.fonts.body};
  color: ${props => props.theme.colors.E};
  font-size: 14;
  font-weight: 400;
`;

export default class ArcView extends PureComponent {
  static Banner = Banner;
  static BrandImage = BrandImage;
  static BrandTitle = BrandTitle;
  static ArcLayout = ArcLayout;
  static Lead = Lead;
  static Title = Title;
  static DropText = DropText;
  static DropTexts = DropTexts;
  static Content = Content;
  static Body = Body;

  static propTypes = {
    children: PropTypes.any,
    bannerSource: PropTypes.any,
    bannerHeight: PropTypes.number,
  };

  static defaultProps = {
    children: null,
    bannerSource: null,
    bannerHeight: 256,
  };

  render() {
    const { children, bannerSource, bannerHeight, ...props } = this.props;
    const [top, ...child] = children;
    return (
      <StyledParallaxScrollView {...props}>
        <Banner height={bannerHeight} source={bannerSource}>
          {top}
        </Banner>
        {child}
      </StyledParallaxScrollView>
    );
  }
}
