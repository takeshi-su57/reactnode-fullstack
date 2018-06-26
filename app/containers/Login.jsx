import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { TextInput, SocialButtons } from '../components';
import { loginAction } from '../actions';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
  password: Yup.string().required('Password is required!'),
});

class Login extends Component {
  submitHandler = ({ email, password }) => {
    const { login } = this.props;
    login(email, password);
  };

  render() {
    return (
      <div>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={this.submitHandler}
          validationSchema={validationSchema}
          render={({ values, touched, errors, handleChange, handleBlur }) => (
            <Form>
              <TextInput
                id="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                error={touched.email && errors.email}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextInput
                id="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                error={touched.password && errors.password}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button type="submit">Login</button>
            </Form>
          )}
        />
        <div className="text-center">
          <SocialButtons />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  login(username, email) {
    dispatch(loginAction(username, email));
  },
});

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default Login;
