import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Carousel from 'react-native-snap-carousel';

import { MapView, NavbarButton } from '../components/';
import Themed, { colors } from '../styles';


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const View = styled.View`
  height: 100;
  width: ${props => props.width};
  padding-horizontal: ${props => props.margin};
  background-color: ${colors.clear};
`;

const Nothing = styled.View`
  background-color: white;
  flex: 1;
`;

const Wrap = styled.View`
  position: absolute;
  bottom: 10;
  left: 0;
  right: 0;
  height: 100;
`;

export default class Home extends Component {
  static navigationOptions = {
    header: ({ navigate }, defaultHeader) => ({
      ...defaultHeader,
      right: <NavbarButton name="ios-more" onPress={() => navigate('MapScreen')} />,
    }),
  }

  state = {
    index: 0,
    routes: [
      { key: '1', title: 'First' },
      { key: '2', title: 'Second' },
      { key: '3', title: 'Second' },
    ],
  };

  handleChangeTab = (index) => {
    this.setState({ index });
  };

  renderHeader = (props) => {
    return (
      <TabBar
        {...props}
        style={{ backgroundColor: colors.black }}
        scrollEnabled={false}
        indicatorStyle={{ backgroundColor: colors.main }}
        // labelStyle={{ color }}
      />
    );
  };

  renderScene = () => null;

  render() {
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

    function wp(percentage) {
      const value = (percentage * viewportWidth) / 100;
      return Math.round(value);
    }

    const slideHeight = viewportHeight * 0.4;
    const slideWidth = wp(75);

    const sliderWidth = viewportWidth;
    const itemHorizontalMargin = wp(2);
    const itemWidth = slideWidth + (itemHorizontalMargin * 2);

    // const sliderWidth = width;
    // const slideWidth = width * 0.7;
    // const margin = 20;
    // const itemWidth = slideWidth + (margin * 2);

    return (
      <Themed content="dark">
        <TabViewAnimated
          swipeEnabled={false}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          onRequestChangeTab={this.handleChangeTab}
        />
        <Container>
          <MapView>
            <Wrap>
              <Carousel
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                firstItem={1}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.6}
                enableMomentum={true}
                containerCustomStyle={{ height: 100 }}
                contentContainerCustomStyle={{}}
                showsHorizontalScrollIndicator={false}
                snapOnAndroid
                removeClippedSubviews={false}
              >
                {[1, 2, 3].map(i => (
                  <View key={i} style={{
                    width: itemWidth,
                    height: slideHeight,
                    paddingHorizontal: itemHorizontalMargin,
                    }} width={itemWidth} margin={itemHorizontalMargin}><Nothing /></View>
                ))}
              </Carousel>
            </Wrap>
          </MapView>
        </Container>
      </Themed>
    );
  }
}
