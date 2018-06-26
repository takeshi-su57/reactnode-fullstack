import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FormWrapper, TextInput, Loading } from '../components';
import { loadProfileAction, saveProfileAction } from '../actions';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required!'),
  lastName: Yup.string().required('Last name is required!'),
});

class Profile extends Component {
  componentDidMount() {
    const { loadProfile } = this.props;
    loadProfile();
  }

  submitHandler = values => {
    const { saveProfile } = this.props;
    saveProfile(values);
  };

  render() {
    const { initialValues } = this.props;
    return initialValues ? (
      <Formik
        initialValues={{ firstName: initialValues.firstName, lastName: initialValues.lastName }}
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

const mapStateToProps = state => ({
  initialValues: state.profile.data,
  error: state.profile.error,
});

const mapDispatchToProps = dispatch => ({
  loadProfile() {
    dispatch(loadProfileAction());
  },
  saveProfile(values) {
    dispatch(saveProfileAction(values));
  },
});

Profile = FormWrapper(Profile, 'Profile');

Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default Profile;
