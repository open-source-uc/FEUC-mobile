import React, { PropTypes, PureComponent } from 'react';
import moment from 'moment';
import trim from 'lodash/trim';

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
        <Bookmark.Lead>{trim(when.format('ddd'), '.').toUpperCase()}</Bookmark.Lead>
        <Bookmark.Title>{trim(when.format('DD'), '.').toUpperCase()}</Bookmark.Title>
        <Bookmark.Lead>{trim(when.format('MMM'), '.').toUpperCase()}</Bookmark.Lead>
      </Bookmark>
    );
  }
}
