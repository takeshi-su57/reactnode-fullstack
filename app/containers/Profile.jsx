import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { FormWrapper, TextInput, validations, Loading } from '../components';
import { loadProfileAction, saveProfileAction } from '../actions';

class Profile extends Component {
  componentDidMount() {
    this.props.loadProfile();
  }

  handleSubmit = (values) => {
    this.props.saveProfile(values);
  };

  render() {
    const { initialValues } = this.props;
    return initialValues ? (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)} noValidate>
        <Field
          name="firstName"
          type="text"
          component={TextInput}
          label="First name"
          validate={[validations.required]}
        />
        <Field
          name="lastName"
          type="text"
          component={TextInput}
          label="Last name"
          validate={[validations.required]}
        />

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    ) : <Loading />;
  }
}

const mapStateToProps = (state) => ({
  // initialValues is a special property for redux-form initalisation
  initialValues: state.profile.data,
  error: state.profile.error,
});

const mapDispatchToProps = (dispatch) => ({
  loadProfile() {
    dispatch(loadProfileAction());
  },
  saveProfile(values) {
    dispatch(saveProfileAction(values));
  },
});

Profile = reduxForm({
  form: 'profileForm',
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(FormWrapper(Profile, 'Profile'));

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile;
