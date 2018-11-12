import React from 'react';
import { Form, Field } from 'react-final-form';

import {
  validations,
  DateTimeControl,
  TextControl,
  CheckboxControl,
  SelectControl,
  MultiSelectControl,
  RadioListControl,
} from '../../../components';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const FormComponent = () => {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ bestStore: 'tesco', employed: true }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
          <Field
            name="bestStore"
            label="Best store"
            type="radio"
            validate={validations.composeValidators(...[validations.required])}
            options={[{ key: 'tesco', value: 'Tesco' }, { key: 'asda', value: 'Asda' }]}
            render={props => <RadioListControl {...props} />}
          />
          <Field
            id="name"
            name="name"
            label="Name"
            placeholder="Enter name"
            validate={validations.composeValidators(...[validations.required])}
            render={props => <TextControl {...props} />}
          />
          <Field
            name="dob"
            label="Date of birth"
            validate={validations.composeValidators(...[validations.required])}
            render={props => <DateTimeControl {...props} />}
          />
          <Field
            name="employed"
            label="Are you employed"
            type="checkbox"
            render={props => <CheckboxControl {...props} />}
          />
          <Field
            name="favoriteColor"
            label="Favorite color"
            validate={validations.composeValidators(...[validations.required])}
            options={[
              { key: 'red', value: 'Red' },
              { key: 'green', value: 'Green' },
              { key: 'blue', value: 'Blue' },
              { key: 'yellow', value: 'Yellow' },
            ]}
            render={props => <SelectControl {...props} />}
          />
          <Field
            name="toppings"
            label="Toppings"
            type="select"
            validate={validations.composeValidators(...[validations.required])}
            options={[
              { key: 'chicken', value: 'Chicken' },
              { key: 'mushroom', value: 'Mushroom' },
              { key: 'tuna', value: 'Tuna' },
            ]}
            multiple
            render={props => <MultiSelectControl {...props} />}
          />
          {/* <Field
            name="sauces"
            label="Sauces"
            type="checkbox"
            validate={validations.composeValidators(...[validations.required])}
            options={[{ key: 'ketchup', value: 'Ketchup' }, { key: 'mayo', value: 'Mayo' }]}
            render={props => <MultiCheckboxControl {...props} />}
          /> */}
          <div className="form-group">
            <label htmlFor="sauces">Sauces</label>
            <div>
              {[{ key: 'ketchup', value: 'Ketchup' }, { key: 'mayo', value: 'Mayo' }].map(item => (
                <div className="form-check form-check-inline" key={item.key}>
                  <Field
                    className="form-check-input"
                    component="input"
                    type="checkbox"
                    id={item.key}
                    name="sauces"
                    value={item.key}
                  />
                  <label className="form-check-label" htmlFor={item.key}>
                    {item.value}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <Field name="notes" component="textarea" className="form-control" placeholder="Notes" />
          </div>
          <button className="btn btn-secondary" type="button" onClick={form.reset} disabled={submitting || pristine}>
            Reset
          </button>{' '}
          <button className="btn btn-primary" type="submit" disabled={submitting || pristine}>
            Submit
          </button>
        </form>
      )}
    />
  );
};

export default FormComponent;
