import React from 'react';

import { validations, AppForm } from '../../../components';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const FormExample = () => {
  const model = {
    // name: 'Asad',
    // password: '123',
    // email: 'example@test.com',
    // telephone: '0123456798',
    // games: ['cricket'],
    // gender: 'male',
    // favouriteColor: 'green',
    // favouriteCars: ['audi', 'bmw'],
    // bio: 'I am a human',
    // employed: true,
    dob: new Date().setHours(0, 0, 0),
  };
  const formConfig = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      validators: [validations.required],
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validators: [validations.required],
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'test@example.com',
      validators: [validations.required],
    },
    {
      name: 'telephone',
      label: 'Telephone',
      type: 'number',
      validators: [validations.required],
    },
    {
      name: 'dob',
      label: 'Date of birth',
      type: 'date',
      validators: [validations.required],
    },
    {
      name: 'games',
      label: 'Games',
      type: 'checkboxlist',
      options: [
        { key: 'football', value: 'Football' },
        { key: 'cricket', value: 'Cricket' },
        { key: 'hockey', value: 'Hockey' },
      ],
      validators: [validations.required],
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'radiolist',
      options: [
        { key: 'male', value: 'Male' },
        { key: 'female', value: 'Female' },
      ],
      validators: [validations.required],
    },
    {
      name: 'favouriteColor',
      label: 'Favourite color',
      type: 'select',
      options: [
        { key: 'green', value: 'Green' },
        { key: 'blue', value: 'Blue' },
        { key: 'red', value: 'Red' },
      ],
      validators: [validations.required],
    },
    {
      name: 'favouriteCars',
      label: 'Favourite cars',
      type: 'multiselect',
      options: [
        { key: 'bmw', value: 'BMW' },
        { key: 'audi', value: 'Audi' },
        { key: 'volvo', value: 'Volvo' },
      ],
      validators: [validations.required],
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      validators: [validations.required],
    },
    {
      name: 'employed',
      label: 'Employed',
      type: 'checkbox',
      validators: [validations.required],
    },
    {
      name: 'photo',
      label: 'Profile photo',
      type: 'file',
      validators: [validations.required],
    },
  ];
  return <AppForm onSubmit={onSubmit} model={model} config={formConfig} />;
};

export default FormExample;
