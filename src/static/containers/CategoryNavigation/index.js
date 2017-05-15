import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/category';
import TreeView from '../../components/TreeView';

import './styles.scss';

class CategoryNavigationView extends React.Component {

    static propTypes = {
        isFetching: React.PropTypes.bool.isRequired,
        data: React.PropTypes.array,
        actions: React.PropTypes.shape({
            categoryFetchData: React.PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        data: []
    };

    componentWillMount() {
        const token = this.props.token || '';
        this.props.actions.categoryFetchData(token, 'categories');
    }

    render() {
      var fillCategory = function(mainCategory, categories) {
        let subCategories = categories.filter((category) => category.parent==mainCategory.url);
        if (subCategories.length > 0) {
          mainCategory.categories = subCategories;
          mainCategory.categories.forEach((category) => {fillCategory(category, categories);});
        }
      }

      var drawCategory = function(mainCategory) {
        if (mainCategory.hasOwnProperty('categories')){
          let subCategories = mainCategory.categories.map((category) => drawCategory(category));
          return (
            <TreeView key={mainCategory.slug} nodeLabel={<span className="node"> {mainCategory.name} </span> } defaultCollapsed={false}>
              {subCategories}
            </TreeView>
          );
        }
        return(
          <div className="category" key={mainCategory.slug}>
            {mainCategory.name}
          </div>
        );

      }

      var categoryTree = false;

      if(this.props.data) {
        const categories = this.props.data;
        var mainCategory = categories.filter((category) => !category.parent)[0];
        fillCategory(mainCategory, categories);
        categoryTree = drawCategory(mainCategory);
      }

      return (
          <div className="caregory-navigation">
            <div className="pull-left">
            {categoryTree}
            </div>
          </div>
      );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.category.data,
        isFetching: state.category.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryNavigationView);
export { CategoryNavigationView as CategoryNavigationViewNotConnected };
