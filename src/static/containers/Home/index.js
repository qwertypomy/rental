import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/date';
import { CategoryNavigationView } from '../index';
import { ItemListView } from '../index';

import { DateRange } from 'react-date-range';

class HomeView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string,
        userName: React.PropTypes.string,
        actions: React.PropTypes.shape({
            dateSetDateRange: React.PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        statusText: '',
        userName: ''
    };

    constructor (props) {
      super(props);
      this.handleDateClick = this.handleDateClick.bind(this);
    }

    handleDateClick (dateRange) {
      const formatedDateRange = {
        date_start: dateRange.startDate < dateRange.endDate ? dateRange.startDate.format('YYYY-MM-DD') : dateRange.endDate.format('YYYY-MM-DD'),
        date_out: dateRange.startDate < dateRange.endDate ? dateRange.endDate.format('YYYY-MM-DD') : dateRange.startDate.format('YYYY-MM-DD')
      }
      this.props.actions.dateSetDateRange(formatedDateRange);
    }

    render() {
        return (
          <div className="raw" >
            <div className="col-md-12">
              <CategoryNavigationView />
              <div className="col-md-3"></div>
                <DateRange className="col-md-2"
  					        onChange={this.handleDateClick}
                    calendars={1}
                    twoStepChange={true}
                    format="L"
                />
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
        statusText: state.auth.statusText,
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
