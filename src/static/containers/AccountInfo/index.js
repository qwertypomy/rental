import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/item';
import { AccountInfoBoxView, AccountInfoFormView } from '../index';
import { EDIT, SAVE } from '../../constants';

class AccountInfoView extends React.Component {

  render() {
    let statusText = null;
    if (this.props.statusText) {
        const statusTextClassNames = classNames({
            'alert': true,
            'alert-danger': this.props.statusText.indexOf('Authentication Error') === 0,
            'alert-success': this.props.statusText.indexOf('Authentication Error') !== 0
        });

        statusText = (
            <div className="row status-text margin-top-medium">
                <div className="col-sm-12">
                    <div className={statusTextClassNames}>
                        {this.props.statusText}
                    </div>
                </div>
            </div>
        );
    }

    return (
      <div className="account-info">
        {statusText}
        {this.props.buttonText==EDIT && <AccountInfoBoxView />}
        {this.props.buttonText==SAVE && <AccountInfoFormView />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        buttonText: state.accountInfo.buttonText,
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps, null)(AccountInfoView);
export { AccountInfoView as AccountInfoViewNotConnected };
