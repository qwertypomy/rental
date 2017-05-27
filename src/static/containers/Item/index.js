import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/book';

class ItemView extends React.Component {
  static propTypes = {
      isFetching: React.PropTypes.bool.isRequired,
      token: React.PropTypes.string,
      formValues: React.PropTypes.object,
      actions: React.PropTypes.shape({
          bookCreateUnauthorisedItemRental: React.PropTypes.func.isRequired,
          bookCreateUserItemRental: React.PropTypes.func.isRequired,
          bookChangeStatus: React.PropTypes.func.isRequired
      }).isRequired
  };

  constructor(props) {
    super(props);
    this.handleBookClick = this.handleBookClick.bind(this);
  }

  componentWillUnmount() {
    this.props.actions.bookChangeStatus('');
  }

  handleBookClick(url, dateRange, e) {
    e.preventDefault();
    let data = { item: url, ...dateRange };
    if (!dateRange.hasOwnProperty('rental_date_start')) {
      this.props.actions.bookChangeStatus("Please select the date range.");
    } else if (this.props.token) {
      this.props.actions.bookCreateUserItemRental(this.props.token, data);
    } else if (this.props.formValues) {
      data = { ...data, ...this.props.formValues };
      this.props.actions.bookCreateUnauthorisedItemRental(data);
    } else {
      this.props.actions.bookChangeStatus("Please fill in the contact form.");
    }
  }

  render() {
    const { url, name, description, daily_rate, attributes, photo } = this.props.item;
    const { dateRange } = this.props;
    return (
      <div className="card col-md-3">
        <img className="card-img-top" src={photo} alt="Card image cap"/>
        <div className="card-block">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{description}</p>
          {
            Object.keys(attributes).map((key, index) =>
              <p className="attribute text-muted" key={index}>{key + ': ' + attributes[key]}</p>
            )
          }
          <p className="card-subtitle mb-2 text-info">{daily_rate + " UAH/Day"}</p>
          <a href="#" disabled={this.props.isFetching} className="btn btn-primary" onClick={(e) => this.handleBookClick(url, dateRange, e)} >Book</a>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        token: state.auth.data ? state.auth.data.token : '',
        formValues: state.contactForm.formValues,
        isFetching: state.book.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemView);
export { ItemView as ItemViewNotConnected };
