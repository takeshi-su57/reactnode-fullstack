import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormWrapper, TextInput, Loading } from '../components';
import { getProfile, saveProfile } from '../services';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required!'),
  lastName: Yup.string().required('Last name is required!'),
});

class Profile extends Component {
  state = {
    profile: null,
  };

  componentDidMount() {
    getProfile().then(profile => {
      this.setState({ profile });
    });
  }

  submitHandler = newProfile => {
    saveProfile(newProfile).then(profile => this.setState({ profile }));
  };

  render() {
    const { profile } = this.state;
    return profile ? (
      <Formik
        initialValues={{ firstName: profile.firstName, lastName: profile.lastName }}
        onSubmit={this.submitHandler}
        validationSchema={validationSchema}
        render={({ values, touched, errors, handleChange, handleBlur }) => (
          <Form>
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
            <button type="submit">Login</button>
          </Form>
        )}
      />
    ) : (
      <Loading />
    );
  }
}

Profile = FormWrapper(Profile, 'Profile');

export default Profile;
