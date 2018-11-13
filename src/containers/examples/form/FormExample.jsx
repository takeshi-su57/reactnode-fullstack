import React from 'react';

import { validations, AppForm } from '../../../components';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const FormComponent = () => {
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
    { name: 'photo', label: 'Profile photo', type: 'file', validators: [validations.required] },
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
    { name: 'telephone', label: 'Telephone', type: 'number', validators: [validations.required] },
    { name: 'dob', label: 'Date of birth', type: 'date', validators: [validations.required] },
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
      options: [{ key: 'male', value: 'Male' }, { key: 'female', value: 'Female' }],
      validators: [validations.required],
    },
    {
      name: 'favouriteColor',
      label: 'Favourite color',
      type: 'select',
      options: [{ key: 'green', value: 'Green' }, { key: 'blue', value: 'Blue' }, { key: 'red', value: 'Red' }],
      validators: [validations.required],
    },
    {
      name: 'favouriteCars',
      label: 'Favourite cars',
      type: 'multiselect',
      options: [{ key: 'bmw', value: 'BMW' }, { key: 'audi', value: 'Audi' }, { key: 'volvo', value: 'Volvo' }],
      validators: [validations.required],
    },
    { name: 'bio', label: 'Bio', type: 'textarea', validators: [validations.required] },
    { name: 'employed', label: 'Employed', type: 'checkbox', validators: [validations.required] },
  ];
  return (
    <AppForm onSubmit={onSubmit} model={model} config={formConfig} />
    // <Form
    //   onSubmit={onSubmit}
    //   initialValues={{ bestStore: 'tesco', employed: true }}
    //   render={({ handleSubmit, form, submitting, pristine, values }) => (
    //     <form onSubmit={handleSubmit}>
    //       <pre>{JSON.stringify(values, 0, 2)}</pre>
    //       <Field
    //         name="bestStore"
    //         label="Best store"
    //         type="radio"
    //         validate={validations.composeValidators(...[validations.required])}
    //         options={[{ key: 'tesco', value: 'Tesco' }, { key: 'asda', value: 'Asda' }]}
    //         render={props => <RadioListControl {...props} />}
    //       />
    //       <Field
    //         id="name"
    //         name="name"
    //         label="Name"
    //         placeholder="Enter name"
    //         validate={validations.composeValidators(...[validations.required])}
    //         render={props => <TextControl {...props} />}
    //       />
    //       <Field
    //         name="dob"
    //         label="Date of birth"
    //         validate={validations.composeValidators(...[validations.required])}
    //         render={props => <DateTimeControl {...props} />}
    //       />
    //       <Field
    //         name="employed"
    //         label="Are you employed"
    //         type="checkbox"
    //         render={props => <CheckboxControl {...props} />}
    //       />
    //       <Field
    //         name="favoriteColor"
    //         label="Favorite color"
    //         validate={validations.composeValidators(...[validations.required])}
    //         options={[
    //           { key: 'red', value: 'Red' },
    //           { key: 'green', value: 'Green' },
    //           { key: 'blue', value: 'Blue' },
    //           { key: 'yellow', value: 'Yellow' },
    //         ]}
    //         render={props => <SelectControl {...props} />}
    //       />
    //       <Field
    //         name="toppings"
    //         label="Toppings"
    //         type="select"
    //         validate={validations.composeValidators(...[validations.required])}
    //         options={[
    //           { key: 'chicken', value: 'Chicken' },
    //           { key: 'mushroom', value: 'Mushroom' },
    //           { key: 'tuna', value: 'Tuna' },
    //         ]}
    //         multiple
    //         render={props => <MultiSelectControl {...props} />}
    //       />
    //       {/* <Field
    //         name="sauces"
    //         label="Sauces"
    //         type="checkbox"
    //         validate={validations.composeValidators(...[validations.required])}
    //         options={[{ key: 'ketchup', value: 'Ketchup' }, { key: 'mayo', value: 'Mayo' }]}
    //         render={props => <MultiCheckboxControl {...props} />}
    //       /> */}
    //       <div className="form-group">
    //         <label htmlFor="sauces">Sauces</label>
    //         <div>
    //           {[{ key: 'ketchup', value: 'Ketchup' }, { key: 'mayo', value: 'Mayo' }].map(item => (
    //             <div className="form-check form-check-inline" key={item.key}>
    //               <Field
    //                 className="form-check-input"
    //                 component="input"
    //                 type="checkbox"
    //                 id={item.key}
    //                 name="sauces"
    //                 value={item.key}
    //               />
    //               <label className="form-check-label" htmlFor={item.key}>
    //                 {item.value}
    //               </label>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //       <div className="form-group">
    //         <label htmlFor="notes">Notes</label>
    //         <Field name="notes" component="textarea" className="form-control" placeholder="Notes" />
    //       </div>
    //       <button className="btn btn-secondary" type="button" onClick={form.reset} disabled={submitting || pristine}>
    //         Reset
    //       </button>{' '}
    //       <button className="btn btn-primary" type="submit" disabled={submitting || pristine}>
    //         Submit
    //       </button>
    //     </form>
    //   )}
    // />
  );
};

export default FormComponent;
