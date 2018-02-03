import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { FormWrapper, TextInput, validations, SocialButtons } from '../components';
import { loginAction } from '../actions';

class Login extends Component {
  submitHandler = (values) => {
    this.props.login(values.email, values.password);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form
          key="loginForm"
          onSubmit={handleSubmit(this.submitHandler)}
          noValidate
        >
          {this.props.auth.error && (
            <div className="alert alert-danger">{this.props.auth.error} </div>
          )}
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

          <button type="submit" className="btn btn-primary">
            Login
        </button>
        </form>
        <div className="text-center">
          <SocialButtons />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  login(username, email) {
    dispatch(loginAction(username, email));
  },
});

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

Login = reduxForm({
  form: 'loginForm',
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(FormWrapper(Login, 'Login'));

export default Login;
