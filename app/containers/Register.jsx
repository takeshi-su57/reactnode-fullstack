import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FormWrapper, TextInput } from '../components';
import { register } from '../services';

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
  handleSubmit = (values, form) => {
    register(values).then(() => {
      form.resetForm();
    });
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
    );
  }
}

Register = FormWrapper(Register, 'Register');

export default Register;
