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
    this.state = {
      selectedValue: ""
    };
    if(this.props.isStaff){
      this.props.actions.usersFetchData(token);
      this.props.actions.bookFetchAllRentals(token);
    } else {
      this.props.actions.bookFetchUserRentals(token);
    }
    this.props.actions.itemFetchData();
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps:',nextProps);
  }

  handleChange(event) {
    const { token } = this.props;
    if(event.target.value) {
      this.props.actions.bookFetchAllRentals(token, {"status":event.target.value});
    } else {
      this.props.actions.bookFetchAllRentals(token);
    }
    this.setState({selectedValue: event.target.value});
  }

  render() {
    const { bookData, itemData, usersData, isStaff } = this.props;
    console.log('bookData: ',bookData);
    return (
      <div>
        <div className="row">
          <div className="category-filter col-md-3">
            <h4>Filter by status:</h4>
            <form onSubmit={this.handleSubmit}>
              <label>
                <select className="form-control"
                  value={this.state.selectedValue}
                  onChange={this.handleChange}>
                  <option value=""></option>
                  <option value="N">Waiting for confirmation.</option>
                  <option value="C">Confirmed, waiting for you.</option>
                  <option value="P">Is given to you.</option>
                  <option value="F">Completed(Returned).</option>
                  <option value="E">Canceled.</option>
                </select>
              </label>
            </form>
          </div>
        </div>

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
