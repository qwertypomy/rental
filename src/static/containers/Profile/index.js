import React from 'react';

import { connect } from 'react-redux';

import { AccountInfoView, BookedItemListView }  from '../index';

const ACCOUNT_INFO = 'Account Information';
const BOOKED_ITEMS = 'Booked Items';

class ProfileView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      button_text: BOOKED_ITEMS
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.button_text == BOOKED_ITEMS) {
      this.setState({button_text: ACCOUNT_INFO});
    } else if (this.state.button_text == ACCOUNT_INFO) {
      this.setState({button_text: BOOKED_ITEMS});
    }
  }

  render() {
    return (
      <div className="profile">
        <a href="#" className="btn btn-primary"
          disabled={this.props.bookIsFetching || this.props.authIsFetching}
          onClick={(e) => this.handleClick(e)} >
          {this.state.button_text}
        </a>
        <div className="container">
          {this.state.button_text==BOOKED_ITEMS && <AccountInfoView />}
          {this.state.button_text==ACCOUNT_INFO && <BookedItemListView />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        bookIsFetching: state.item.isFetching,
        authIsFetching: state.auth.isFetching
    };
};

export default connect(mapStateToProps, null)(ProfileView);
export { ProfileView as ProfileViewNotConnected };
