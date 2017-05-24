import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/item';

class BookedItemView extends React.Component {
  render() {
    return (
      <div className="booked-item">
        BookedItemView
      </div>
    );
  }
}

export default BookedItemView;
export { BookedItemView as BookedItemViewNotConnected };
