import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authEditUser } from '../../actions/auth';

class AccountInfoFormView extends React.Component {
  render() {
    return (
      <div className="account-info-form">
        AccountInfoFormView
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
        actions: bindActionCreators({authEditUser}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfoFormView);
export { AccountInfoFormView as AccountInfoFormViewNotConnected };
