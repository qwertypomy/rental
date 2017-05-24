import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import t from 'tcomb-form';

import * as actionCreators from '../../actions/auth';

const Form = t.form.Form;

const Register = t.struct({
  phoneNumber: t.String,
  firstName: t.String,
  lastName: t.String,
  email: t.maybe(t.String),
  password: t.String
});

const RegisterFormOptions = {
  auto: 'placeholders',
  help: <i>Hint: Phone number format: +380*********</i>,
  fields: {
    password: {
      type: 'password'
    },
    email: {
      nullOption: false
    }
  }
};

class RegisterView extends React.Component {

  static propTypes = {
      dispatch: React.PropTypes.func.isRequired,
      isAuthenticated: React.PropTypes.bool.isRequired,
      isAuthenticating: React.PropTypes.bool.isRequired,
      statusText: React.PropTypes.string,
      actions: React.PropTypes.shape({
          authRegisterUser: React.PropTypes.func.isRequired
      }).isRequired,
      location: React.PropTypes.shape({
          query: React.PropTypes.object.isRequired
      })
  };

  static defaultProps = {
      statusText: '',
      location: null
  };

  constructor(props) {
      super(props);

      const redirectRoute = this.props.location ? this.props.location.query.next || '/' : '/';
      this.state = {
          formValues: {
              phoneNumber: '',
              firstName: '',
              lastName: '',
              email: '',
              password: ''
          },
          redirectTo: redirectRoute
      };
  }

  componentWillMount() {
      if (this.props.isAuthenticated) {
          this.props.dispatch(push('/'));
      }
  }

  onFormChange = (value) => {
      this.setState({ formValues: value });
  };

  register = (e) => {
      e.preventDefault();
      const value = this.registerForm.getValue();
      if (value) {
          this.props.actions.authRegisterUser(value.phoneNumber, value.firstName, value.lastName, value.email, value.password, this.state.redirectTo);
      }
  };

  render() {
      let statusText = null;
      if (this.props.statusText) {
          const statusTextClassNames = classNames({
              'alert': true,
              'alert-danger': this.props.statusText.indexOf('Authentication Error') === 0,
              'alert-success': this.props.statusText.indexOf('Authentication Error') !== 0
          });

          statusText = (
              <div className="row">
                  <div className="col-sm-12">
                      <div className={statusTextClassNames}>
                          {this.props.statusText}
                      </div>
                  </div>
              </div>
          );
      }

      return (
          <div className="container register">
              <h1 className="text-center">Register</h1>
              <div className="register-container margin-top-medium">
                  {statusText}
                  <form onSubmit={this.register}>
                      <Form ref={(ref) => { this.registerForm = ref; }}
                            type={Register}
                            options={RegisterFormOptions}
                            value={this.state.formValues}
                            onChange={this.onFormChange}
                      />
                      <button disabled={this.props.isAuthenticating}
                              type="submit"
                              className="btn btn-default btn-block"
                      >
                          Submit
                      </button>
                  </form>
              </div>
          </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
      isAuthenticated: state.auth.isAuthenticated,
      isAuthenticating: state.auth.isAuthenticating,
      statusText: state.auth.data.statusText
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      dispatch,
      actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
export { RegisterView as RegisterViewNotConnected };
