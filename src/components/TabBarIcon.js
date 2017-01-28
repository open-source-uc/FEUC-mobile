import React, { PropTypes } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabBarIcon = ({ tintColor, focused, icon }) => (
  <Ionicons
    name={focused ? `ios-${icon}` : `ios-${icon}-outline`}
    size={26}
    style={{ color: tintColor }}
  />
);

TabBarIcon.propTypes = {
  tintColor: PropTypes.any.isRequired,
  focused: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
};

TabBarIcon.Home = props => (
  <TabBarIcon icon="home" {...props} />
);

TabBarIcon.Community = props => (
  <TabBarIcon icon="people" {...props} />
);

TabBarIcon.About = props => (
  <TabBarIcon icon="help" {...props} />
);

TabBarIcon.Benefits = props => (
  <TabBarIcon icon="pricetags" {...props} />
);

TabBarIcon.More = props => (
  <TabBarIcon icon="more" {...props} />
);

export default TabBarIcon;
