import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/date';
import { CategoryNavigationView, ItemListView, ContactFormView } from '../index';
import { DateRange } from 'react-date-range';
import classNames from 'classnames';

class HomeView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string,
        userName: React.PropTypes.string,
        actions: React.PropTypes.shape({
            dateSetDateRange: React.PropTypes.func.isRequired
        }).isRequired
    };

    constructor (props) {
      super(props);
      this.handleDateClick = this.handleDateClick.bind(this);
    }

    handleDateClick (dateRange) {
      const formatedDateRange = {
        rental_date_start: dateRange.startDate < dateRange.endDate ? dateRange.startDate.format('YYYY-MM-DD') : dateRange.endDate.format('YYYY-MM-DD'),
        rental_date_out: dateRange.startDate < dateRange.endDate ? dateRange.endDate.format('YYYY-MM-DD') : dateRange.startDate.format('YYYY-MM-DD')
      }
      this.props.actions.dateSetDateRange(formatedDateRange);
    }

    render() {
      let statusText = null;
      if (this.props.statusText) {
          const statusTextClassNames = classNames({
              'alert': true,
              'alert-danger': this.props.statusText === 'Please fill in the contact form.',
              'alert-success': this.props.statusText !== 'Please fill in the contact form.'
          });

          statusText = (
              <div className="col-sm-12">
                  <div className={statusTextClassNames + ' text-center'}>
                      {this.props.statusText}
                  </div>
              </div>
          );
      }

        return (
          <div>
            <div className="row" >
              {statusText}
              <CategoryNavigationView />
              <div className="col-md-2"></div>
              {this.props.userName && <div className="col-md-1"></div>}
              <div className="col-md-2">
                <DateRange
    				        onChange={this.handleDateClick}
                    calendars={1}
                    twoStepChange={true}
                    format="L"
                />
              </div>
              {!this.props.userName && <ContactFormView />}
            </div>
            <div className="container">
              <ItemListView />
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.book.statusText,
        dateRange: state.date.dateRange
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
