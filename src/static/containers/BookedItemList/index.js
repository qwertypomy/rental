import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { itemFetchData } from '../../actions/item';
import { bookFetchData } from '../../actions/book';

import { BookedItemView }  from '../index';

class BookedItemListView extends React.Component {
  componentWillMount() {
    this.props.actions.itemFetchData();
    this.props.actions.bookFetchData(this.props.token);
  }

  render() {
    const { bookData, itemData, isStaff } = this.props;
    return (
      <div className="booked-item-list margin-top-medium">
        <div className="card-group">
          {
            bookData && bookData.map((book) =>
              <BookedItemView key={ book.url } book={book}
                item={ itemData.find((item) => item.url==book.item) } />
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        itemData: state.item.data,
        bookData: state.book.data,
        token: state.auth.data.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({itemFetchData, bookFetchData}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookedItemListView);
export { BookedItemListView as BookedItemListViewNotConnected };
