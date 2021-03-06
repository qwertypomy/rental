import React from 'react';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bookEditRental } from '../../actions/book';

class BookedItemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeButton: true,
      selectedValue: this.props.book.status
    };
    this.convertStatus = this.convertStatus.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderUserInfo = this.renderUserInfo.bind(this);
  }

  convertStatus(status) {
    switch (status) {
      case 'N': return 'Waiting for confirmation.';
      case 'C': return 'Confirmed, waiting for you.';
      case 'P': return 'Is given to you.';
      case 'F': return 'Completed(Returned).';
      case 'E': return 'Canceled.';
      default: return 'ERROR: status = ' + status;
    }
  }

  handleChange(event) {
    this.setState({selectedValue: event.target.value});
  }

  renderButton() {
    if (this.state.changeButton) {
      return (
        <a href="#" disabled={this.props.isFetching}
          className="btn btn-primary"
          onClick={(e) => this.handleButtonClick(e)} >
          Change Status
        </a>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <select className="form-control"
              value={this.state.selectedValue}
              onChange={this.handleChange}>
              <option value="N">Waiting for confirmation.</option>
              <option value="C">Confirmed, waiting for you.</option>
              <option value="P">Is given to you.</option>
              <option value="F">Completed(Returned).</option>
              <option value="E">Canceled.</option>
            </select>
          </label>
          <input className="btn btn-default" type="submit" value="Save"
            onClick={(e) => this.handleButtonClick(e)}/>
      </form>
      );
    }
  }

  handleButtonClick(e) {
    e.preventDefault();
    const { book, token } = this.props;
    if (!this.state.changeButton) {
      this.setState({changeButton: false});
      this.props.actions.bookEditRental(book.url, token, {status:this.state.selectedValue}).then(
        this.setState({changeButton: true})
      );
    } else {
      this.setState({changeButton: false});
    }
  }

  renderUserInfo() {
    const { book, user } = this.props;
    if (user) {
      return(
        <div>
          <p className="text-info">{user.first_name} {user.last_name} {user.phone_number}</p>
        </div>
      );
    } else {
      return(
        <div>
          <p className="text-info">{book.full_name} {book.phone_number}</p>
        </div>
      );
    }
  }

  render() {
    const { item, book, user, isStaff } = this.props;
    return (
      <div className="card col-md-4">
        <img className="card-img-top" src={item.photo} alt="Card image cap"/>
        <div className="card-block">
          <h4 className="card-title">{item.name}</h4>
          { !isStaff && <p className="card-text">{item.description}</p> }
          {
            Object.keys(item.attributes).map((key, index) =>
              <p className="attribute text-muted" key={index}>{key + ': ' + item.attributes[key]}</p>
            )
          }
          <div className="card-subtitle">
            <p className="text-info">Created: {moment(book.created).format('Do MMMM YYYY, h:mm:ss a')}</p>
            <p className="text-info">Status: {this.convertStatus(book.status)}</p>
            <p className="text-info">
              {
                'From ' +
                moment(book.rental_date_start).format('Do MMMM YYYY') +
                ' to ' + moment(book.rental_date_out).format('Do MMMM YYYY')
              }
            </p>
            <p className="text-info">{book.rental_amount_due + " UAH"}</p>
            {isStaff && this.renderUserInfo()}
            {isStaff && this.renderButton()}

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        isStaff: state.auth.data.isStaff,
        token: state.auth.data.token,
        isFetching: state.book.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({bookEditRental}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookedItemView);
export { BookedItemView as BookedItemViewNotConnected };
