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

    constructor (props) {
      super(props);
      this.handleSelectCategory = this.handleSelectCategory.bind(this);
      this.fillCategory = this.fillCategory.bind(this);
      this.drawCategory = this.drawCategory.bind(this);
    }

    componentWillMount() {
        this.props.actions.categoryFetchData();
    }

    handleSelectCategory(category, e) {
      e.preventDefault();
      this.props.actions.categorySetSelectedCategory(category);
    }

    fillCategory(mainCategory, categories) {
      let subCategories = categories.filter((category) => category.parent==mainCategory.url);
      if (subCategories.length > 0) {
        mainCategory.categories = subCategories;
        mainCategory.categories.forEach((category) => {this.fillCategory(category, categories);});
      }
    }

    drawCategory(mainCategory) {
      if (mainCategory){
        if (mainCategory.hasOwnProperty('categories')){
          let subCategories = mainCategory.categories.map((category) => this.drawCategory(category));
          return (
            <TreeView key={mainCategory.slug} nodeLabel={<a onClick={ (e) => this.handleSelectCategory(mainCategory, e) } href="#">{mainCategory.name}</a> } defaultCollapsed={false}>
              {subCategories}
            </TreeView>
          );
        }
        return(
          <div className="category" key={mainCategory.slug}><a onClick={ (e) => this.handleSelectCategory(mainCategory, e) } href="#">{mainCategory.name}</a></div>
        );
      }
    }

    render() {
      var categoryTree = false;

      if(this.props.data) {
        const categories = this.props.data;
        var mainCategory = categories.filter((category) => !category.parent)[0];
        this.fillCategory(mainCategory, categories);
        categoryTree = this.drawCategory(mainCategory);
      }

      return (
          <div className="category-navigation">
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
        isFetching: state.category.isFetching,
        dateRange: state.date.dateRange
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryNavigationView);
export { CategoryNavigationView as CategoryNavigationViewNotConnected };
