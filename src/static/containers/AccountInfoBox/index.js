import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/accountInfo';
import { EDIT } from '../../constants';

import './styles.scss';

class AccountInfoBoxView extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.actions.accountInfoToggleButton();
  }

  render() {
    return (
      <div className="account-info-box">
        <p>First name: {this.props.data.firstName}</p>
        <p>Last name: {this.props.data.lastName}</p>
        <p>Email: {this.props.data.email?this.props.data.email:'No email'}</p>
        <a href="#" className="btn btn-primary"
          onClick={(e) => this.handleClick(e)} >
          {EDIT}
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        data: state.auth.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfoBoxView);
export { AccountInfoBoxView as AccountInfoBoxViewNotConnected };
