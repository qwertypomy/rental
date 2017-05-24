import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/item';

import { BookedItemView }  from '../index';

class BookedItemListView extends React.Component {
  render() {
    return (
      <div className="booked-item-list">
        BookedItemListView
        <BookedItemView />
      </div>
    );
  }
}

export default BookedItemListView;
export { BookedItemListView as BookedItemListViewNotConnected };
