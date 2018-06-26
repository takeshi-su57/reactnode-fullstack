import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FormWrapper, TextInput } from '../components';
import { registerAction } from '../actions';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required!'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
  password: Yup.string().required('Password is required!'),
  firstName: Yup.string().required('First name is required!'),
  lastName: Yup.string().required('Last name is required!'),
});

class Register extends Component {
  handleSubmit = values => {
    const { register } = this.props;
    register(values);
  };

  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '', username: '', firstName: '', lastName: '' }}
        onSubmit={this.handleSubmit}
        validationSchema={validationSchema}
        render={({ values, touched, errors, handleChange, handleBlur }) => (
          <Form>
            <TextInput
              id="username"
              type="text"
              label="Username"
              placeholder="Enter your username"
              error={touched.username && errors.username}
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
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
            <TextInput
              id="firstName"
              type="text"
              label="First name"
              placeholder="Enter your first name"
              error={touched.firstName && errors.firstName}
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextInput
              id="lastName"
              type="text"
              label="Last name"
              placeholder="Enter your last name"
              error={touched.lastName && errors.lastName}
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button type="submit">Register</button>
          </Form>
        )}
      />
      // <form onSubmit={handleSubmit(this.handleSubmit)} noValidate>
      //   {register.error && <div className="error">{register.error} </div>}
      //   <Field name="username" type="text" component={TextInput} label="Username" validate={[validations.required]} />
      //   <Field
      //     name="email"
      //     type="email"
      //     component={TextInput}
      //     label="Email"
      //     validate={[validations.required, validations.email]}
      //   />
      //   <Field
      //     name="password"
      //     type="password"
      //     component={TextInput}
      //     label="Password"
      //     validate={[validations.required]}
      //   />

      //   <Field name="firstName" type="text" component={TextInput} label="First name" />

      //   <Field name="lastName" type="text" component={TextInput} label="Last name" />

      //   <button type="submit" className="btn btn-primary">
      //     Register
      //   </button>
      // </form>
    );
  }
}

const mapStateToProps = state => ({
  register: state.register,
});

const mapDispatchToProps = dispatch => ({
  register(values) {
    dispatch(registerAction(values));
  },
});

Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

Register = FormWrapper(Register, 'Register');

export default Register;
