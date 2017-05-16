import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/item';
import ItemView from '../../components/Item';


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

    constructor (props) {
      super(props);

    }

    componentWillMount() {
        this.props.actions.itemFetchData();
    }


    render() {
      return (
          <div className="item-list">
            <div className="container">
            {
              this.props.data && this.props.data.map((item) =>
                <ItemView key={ item.url } data={item} />
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
        isFetching: state.item.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemListView);
export { ItemListView as ItemListViewNotConnected };
