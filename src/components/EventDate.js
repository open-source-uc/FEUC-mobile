import React, { PropTypes, PureComponent } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

import { images } from '../assets/';


const Container = styled.Image`
  position: absolute;
  right: 18;
  bottom: 0;
  width: 56;
  height: 95;
`;

Container.defaultProps = {
  source: images.eventBookmark,
};

const Content = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3 3 10;
`;

const Common = styled.Text`
  color: ${props => props.theme.colors.lightGray};
  background-color: transparent;
  text-align: center;
  font-family: ${props => props.theme.fonts.headers};
  font-weight: 900;
  font-size: 14;
  height: 12;
  line-height: 15;
  margin: 2 0;
`;

const DayName = styled(Common)`

`;

const DayNumber = styled(Common)`
  color: ${props => props.theme.colors.lightBlack};
  font-size: 25;
  font-weight: 200;
  height: 20;
  line-height: 25;
`;

const MonthName = styled(Common)`

`;


export default class EventDate extends PureComponent {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
  }

  static defaultProps = {
    date: new Date(),
  }

  render() {
    const { date, ...props } = this.props;
    const when = moment(date);

    return (
      <Container {...props}>
        <Content>
          <DayName>{when.format('ddd').toUpperCase()}</DayName>
          <DayNumber>{when.format('DD').toUpperCase()}</DayNumber>
          <MonthName>{when.format('MMM').toUpperCase()}</MonthName>
        </Content>
      </Container>
    );
  }
}
