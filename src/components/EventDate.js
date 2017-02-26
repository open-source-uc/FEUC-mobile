import React, { PropTypes, PureComponent } from 'react';
import moment from 'moment';

import Bookmark from './Bookmark';


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
      <Bookmark {...props}>
        <Bookmark.Lead>{when.format('ddd').toUpperCase()}</Bookmark.Lead>
        <Bookmark.Title>{when.format('DD').toUpperCase()}</Bookmark.Title>
        <Bookmark.Lead>{when.format('MMM').toUpperCase()}</Bookmark.Lead>
      </Bookmark>
    );
  }
}
