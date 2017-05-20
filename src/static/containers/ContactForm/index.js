import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import t from 'tcomb-form';

import * as actionCreators from '../../actions/contactForm';

const Form = t.form.Form;

const Contact = t.struct({
  phone_number: t.String,
  full_name: t.String,
  email: t.maybe(t.String)
});

const ContactFormOptions = {
  auto: 'placeholders',
  fields: {
    email: {
      nullOption: false
    }
  }
};

class ContactFormView extends React.Component {

  static propTypes = {
      dispatch: React.PropTypes.func.isRequired,
      actions: React.PropTypes.shape({
          contactFormSetValues: React.PropTypes.func.isRequired
      }).isRequired
  };

  onFormChange = (value) => {
      this.props.actions.contactFormSetValues(value);
  };

  render() {
      return (
          <div className="col-md-2">
              <h1 className="text-center">Contact form</h1>
                  <form onSubmit={this.register}>
                      <Form ref={(ref) => { this.contactForm = ref; }}
                            type={Contact}
                            options={ContactFormOptions}
                            value={this.props.formValues}
                            onChange={this.onFormChange}
                      />
                  </form>
          </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
      formValues: state.contactForm.formValues
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
      dispatch,
      actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactFormView);
export { ContactFormView as ContactFormViewNotConnected };
