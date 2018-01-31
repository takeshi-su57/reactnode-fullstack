import React, { Component } from 'react';
import { FormWrapper, TextInput, validations } from '../components';
import { reduxForm, Field } from 'redux-form';
// import { profileUpdate } from '../services';

class Profile extends Component {
  handleSubmit = values => {
    console.log(values);
    // profileUpdate(values);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)} noValidate>
        <Field
          name="email"
          type="email"
          component={TextInput}
          label="Email"
          validate={[validations.required, validations.email]}
        />
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    );
  }
}

Profile = reduxForm({
  form: 'profileForm'
})(FormWrapper(Profile, 'Profile'));

export default Profile;
