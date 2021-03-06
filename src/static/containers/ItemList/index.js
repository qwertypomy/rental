import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/item';
import {ItemView} from '../index';


class ItemListView extends React.Component {

    static propTypes = {
        isFetching: React.PropTypes.bool.isRequired,
        data: React.PropTypes.array,
        actions: React.PropTypes.shape({
            itemFetchData: React.PropTypes.func.isRequired,
            itemFetchDataByCategory: React.PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        data: []
    };

    componentWillMount() {
        this.props.actions.itemFetchData(this.props.dateRange);
    }

    componentWillReceiveProps(nextProps) {
      if ((JSON.stringify(this.props.dateRange) !== JSON.stringify(nextProps.dateRange)) || (JSON.stringify(this.props.selectedCategory) !== JSON.stringify(nextProps.selectedCategory))){
        if (nextProps.selectedCategory) {
          this.props.actions.itemFetchDataByCategory(nextProps.selectedCategory.url, nextProps.dateRange);
        } else {
          this.props.actions.itemFetchData(nextProps.dateRange);
        }

      }
    }

    render() {
      return (
          <div className="item-list">
              <div className="card-group">
              {
                this.props.data && this.props.data.map((item) =>
                  <ItemView key={ item.url } item={item} dateRange={this.props.dateRange} />
                )
              }
              </div>
          </div>
      );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.item.data,
        isFetching: state.item.isFetching,
        dateRange: state.date.dateRange,
        selectedCategory: state.category.selectedCategory
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemListView);
export { ItemListView as ItemListViewNotConnected };
