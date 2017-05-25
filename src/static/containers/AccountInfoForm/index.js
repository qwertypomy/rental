import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import t from 'tcomb-form';
import { authEditUser } from '../../actions/auth';
import { accountInfoToggleButton } from '../../actions/accountInfo';
import { SAVE } from '../../constants';

const Form = t.form.Form;

const Edit = t.struct({
  firstName: t.String,
  lastName: t.String,
  email: t.maybe(t.String)
});

const EditFormOptions = {
  auto: 'placeholders',
  fields: {
    email: {
      nullOption: false
    }
  }
};

class AccountInfoFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        firstName: this.props.data.firstName,
        lastName: this.props.data.lastName,
        email: this.props.data.email
      },
    };
    this.edit = this.edit.bind(this);
  }

  onFormChange = (value) => {
      this.setState({ formValues: value });
  };

  edit(e) {
      e.preventDefault();
      const value = this.editForm.getValue();
      if (value) {
          this.props.actions.authEditUser(this.props.data.url, this.props.data.token,
             value.firstName, value.lastName, value.email);
      }
  }

  render() {
    return (
      <div className="account-info-form col-md-4">
        <h1 className="text-center">Edit profile</h1>
        <div className="edit-container margin-top-medium">
            <form onSubmit={this.edit}>
                <Form ref={(ref) => { this.editForm = ref; }}
                      type={Edit}
                      options={EditFormOptions}
                      value={this.state.formValues}
                      onChange={this.onFormChange}
                />
                <button disabled={this.props.isAuthenticating}
                        type="submit"
                        className="btn btn-default btn-block"
                >
                    { SAVE }
                </button>
            </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        data: state.auth.data,
        isAuthenticating: state.auth.isAuthenticating
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({authEditUser, accountInfoToggleButton}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfoFormView);
export { AccountInfoFormView as AccountInfoFormViewNotConnected };
