import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { itemFetchData } from '../../actions/item';
import { usersFetchData } from '../../actions/users';
import { bookFetchUserRentals, bookFetchAllRentals } from '../../actions/book';

import { BookedItemView }  from '../index';

class BookedItemListView extends React.Component {
  componentWillMount() {
    const { token } = this.props;
    if(this.props.isStaff){
      this.props.actions.usersFetchData(token);
      this.props.actions.bookFetchAllRentals(token);
    } else {
      this.props.actions.bookFetchUserRentals(token);
    }
    this.props.actions.itemFetchData();
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps:',nextProps);
  }

  render() {
    const { bookData, itemData, usersData, isStaff } = this.props;
    console.log('bookData: ',bookData);
    return (
      <div className="booked-item-list margin-top-medium">
        <div className="card-group">
          {
            bookData && itemData && bookData.map((book) =>
              <BookedItemView key={ book.url } book={book}
                item={ itemData.find((item) => item.url==book.item) }
                user={book.hasOwnProperty('user') && usersData ? usersData.find((user) => user.url==book.user) : undefined}
                />
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
        usersData: state.auth.data.isStaff ? state.users.data : null,
        token: state.auth.data.token,
        isStaff: state.auth.data.isStaff
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
          {
            itemFetchData,
            bookFetchUserRentals,
            bookFetchAllRentals,
            usersFetchData
           }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookedItemListView);
export { BookedItemListView as BookedItemListViewNotConnected };
