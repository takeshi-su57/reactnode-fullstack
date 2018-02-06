import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { FormWrapper, TextInput, validations } from '../components';
import { registerAction } from '../actions';

class Register extends Component {
  handleSubmit = (values) => {
    this.props.register(values);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)} noValidate>
        {this.props.register.error && (
          <div className="alert alert-danger">{this.props.register.error} </div>
        )}
        <Field
          name="username"
          type="text"
          component={TextInput}
          label="Username"
          validate={[validations.required]}
        />
        <Field
          name="email"
          type="email"
          component={TextInput}
          label="Email"
          validate={[validations.required, validations.email]}
        />
        <Field
          name="password"
          type="password"
          component={TextInput}
          label="Password"
          validate={[validations.required]}
        />

        <Field
          name="firstName"
          type="text"
          component={TextInput}
          label="First name"
        />

        <Field
          name="lastName"
          type="text"
          component={TextInput}
          label="Last name"
        />

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  register: state.register,
});

const mapDispatchToProps = (dispatch) => ({
  register(values) {
    dispatch(registerAction(values));
  },
});

Register = connect(mapStateToProps, mapDispatchToProps)(Register);

Register = reduxForm({
  form: 'registerForm',
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(FormWrapper(Register, 'Register'));

export default Register;
