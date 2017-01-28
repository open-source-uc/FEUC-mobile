import { TabNavigator, StackNavigator } from 'react-navigation';

import { Home, Community, About, Benefits, More } from './screens/';
import { colors } from './styles';


const HomeScreen = StackNavigator({
  Root: {
    screen: Home,
  },
}, {
  initialRouteName: 'Root',
});

const CommunityScreen = StackNavigator({
  Root: {
    screen: Community,
  },
}, {
  initialRouteName: 'Root',
});

const AboutScreen = StackNavigator({
  Root: {
    screen: About,
  },
}, {
  initialRouteName: 'Root',
});

const BenefitsScreen = StackNavigator({
  Root: {
    screen: Benefits,
  },
}, {
  initialRouteName: 'Root',
});

const MoreScreen = StackNavigator({
  Root: {
    screen: More,
  },
}, {
  initialRouteName: 'Root',
});

// https://reactnavigation.org/docs/navigators/tab
export default TabNavigator({
  Community: {
    screen: CommunityScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  About: {
    screen: AboutScreen,
  },
  Benefits: {
    screen: BenefitsScreen,
  },
  More: {
    screen: MoreScreen,
  },
}, {
  tabBarOptions: {
    // tabBarComponent: TabView.TabBarBottom,
    tabBarPosition: 'bottom', // 'top' 'bottom'
    activeTintColor: colors.main,
    // swipeEnabled: false,
    // animationEnabled: true,
    lazyLoad: true,
    initialTab: 'Home',
    order: ['Home', 'Community', 'About', 'Benefits', 'More'],
  //   activeBackgroundColor,
  //   inactiveTintColor,
  //   inactiveBackgroundColor,
  //   inactiveBackgroundColor,
  //   style: {
  //     backgroundColor: 'blue',
  //   },
  //   showIcon
  //   showLabel
  //   upperCaseLabel
  //   scrollEnabled
  },
});
