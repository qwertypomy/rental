import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { CategoryNavigationView } from '../index';
import {ProtectedView} from '../index';
class HomeView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string,
        userName: React.PropTypes.string
    };

    static defaultProps = {
        statusText: '',
        userName: ''
    };

    render() {
        return (
            <div className="container custom-container" >
                <div className="text-center">
                    <h1>Sports Rental</h1>
                    <CategoryNavigationView />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
