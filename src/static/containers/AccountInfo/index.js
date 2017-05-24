import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/item';
import { AccountInfoBoxView, AccountInfoFormView } from '../index';
import { EDIT, SAVE } from '../../constants';

class AccountInfoView extends React.Component {

  render() {
    return (
      <div className="account-info">
        {this.props.buttonText==EDIT && <AccountInfoBoxView />}
        {this.props.buttonText==SAVE && <AccountInfoFormView />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        buttonText: state.accountInfo.buttonText
    };
};

export default connect(mapStateToProps, null)(AccountInfoView);
export { AccountInfoView as AccountInfoViewNotConnected };
