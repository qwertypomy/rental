import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bookEditRental } from '../../actions/book';

class BookedItemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeButton: true
    };
    this.convertStatus = this.convertStatus.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  convertStatus(status) {
    switch (status) {
      case 'N': return 'Waiting for confirmation.';
      case 'C': return 'Confirmed, waiting for you.';
      case 'P': return 'Is given to you.';
      case '+': return 'Completed(Returned).';
      case '-': return 'Canceled.';
      default: return 'ERROR: status = ' + status;
    }
  }

  renderButton() {
    var new_status = 'P'; // TODO: выпадающий список с выбором статуса
    //TODO: ререндерить измененный Book ---- componentWillReceiveProps
    if (this.state.changeButton) {
      return (
        <a href="#" disabled={this.props.isFetching}
          className="btn btn-primary pull-right pull-bottom"
          onClick={(e) => this.handleButtonClick(new_status, e)} >
          Change Status
        </a>
      );
    } else {
      return (
        <a href="#" disabled={this.props.isFetching}
          className="btn btn-primary pull-right pull-bottom"
          onClick={(e) => this.handleButtonClick(new_status, e)} >
          Submit
        </a>
      );
    }
  }

  handleButtonClick(new_status, e) {
    e.preventDefault();
    const { book, token } = this.props;
    if (!this.state.changeButton) {
      this.setState({changeButton: false});
      this.props.actions.bookEditRental(book.url, token, {status:new_status}).then(
        this.setState({changeButton: true})
      );
    } else {
      this.setState({changeButton: false});
    }

  }

  render() {
    const { item, book, isStaff } = this.props;
    return (
      <div className="card col-md-3">
        <img className="card-img-top" src={item.attributes.imgs[0]} alt="Card image cap"/>
        <div className="card-block">
          <h4 className="card-title">{item.name}</h4>
          <p className="card-text">{item.description}</p>
          {
            Object.keys(item.attributes).map((key, index) => {
              if(key!='imgs') {
                return <p className="attribute text-muted" key={index}>{key + ': ' + item.attributes[key]}</p>;
              }
            }
            )
          }
          <div className="card-subtitle">
            <p className="text-info">Status: {this.convertStatus(book.status)}</p>
            <p className="text-info">From {book.rental_date_start} to {book.rental_date_out}</p>
            <p className="text-info">{book.rental_amount_due + " UAH"}</p>
            {this.renderButton()}

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
