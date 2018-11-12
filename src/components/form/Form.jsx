import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

import { DateTimeControl } from './controls';
import { validations } from './validations';

export class AppForm extends Component {
  render() {
    const { model, config, onSubmit } = this.props;
    return (
      <>
        <Form
          onSubmit={onSubmit}
          initialValues={model}
          render={({ handleSubmit, pristine, invalid, form, values, submitting }) => (
            <form onSubmit={handleSubmit}>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
              {config.map(c => {
                return this.getFormField(c);
              })}
              <button className="btn btn-secondary" onClick={() => form.reset()} disabled={submitting || pristine}>
                Reset
              </button>{' '}
              <button className="btn btn-primary" type="submit" disabled={pristine || invalid}>
                Submit
              </button>
            </form>
          )}
        />
      </>
    );
  }

  getFormField = config => {
    let formField = null;
    const { name, label, type, placeholder, validators } = config;
    if (type === 'text' || type === 'password' || type === 'email' || type === 'number') {
      formField = (
        <Field key={name} name={name} validate={validations.composeValidators(...(validators || []))}>
          {({ input, meta }) => (
            <div className="form-group">
              <label>{label}</label>
              <input
                {...input}
                className={`form-control ${meta.touched &&
                  ((meta.invalid && 'is-invalid') || (meta.valid && 'is-valid'))}`}
                type={type}
                placeholder={placeholder}
              />
              {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
            </div>
          )}
        </Field>
      );
    } else if (type === 'textarea') {
      formField = (
        <Field key={name} name={name} validate={validations.composeValidators(...(validators || []))}>
          {({ input, meta }) => (
            <div className="form-group">
              <label>{label}</label>
              <textarea
                {...input}
                className={`form-control ${meta.touched &&
                  ((meta.invalid && 'is-invalid') || (meta.valid && 'is-valid'))}`}
                placeholder={placeholder}
              />
              {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
            </div>
          )}
        </Field>
      );
    } else if (type === 'checkbox') {
      formField = (
        <Field key={name} name={name} type="checkbox" validate={validators}>
          {({ input, meta }) => (
            <div className="form-group">
              <div className="form-check">
                <input {...input} id={name} className="form-check-input" type="checkbox" />{' '}
                <label htmlFor={name} className="form-check-label">
                  {label}
                </label>
              </div>
              {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
            </div>
          )}
        </Field>
      );
    } else if (type === 'checkboxlist') {
      formField = (
        <div className="form-group" key={name}>
          <label htmlFor={name}>{label}</label>
          <div>
            {(config.options || []).map(item => (
              <div className="form-check form-check-inline" key={`${name}-${item.key}`}>
                <Field
                  name={name}
                  type="checkbox"
                  value={item.key}
                  render={({ input, meta }) => (
                    <>
                      <label className="form-check-label" htmlFor={item.key}>
                        <input {...input} name={name} id={item.key} type="checkbox" value={item.key} /> {item.value}
                      </label>
                    </>
                  )}
                />
              </div>
            ))}
          </div>
          {/* {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>} */}
        </div>
      );
    } else if (type === 'radiolist') {
      formField = (
        <div className="form-group" key={name}>
          <label htmlFor={name}>{label}</label>
          <div>
            {(config.options || []).map(item => (
              <div className="form-check form-check-inline" key={`${name}-${item.key}`}>
                <Field
                  name={name}
                  type="radio"
                  value={item.key}
                  render={({ input, meta }) => (
                    <>
                      <label className="form-check-label" htmlFor={item.key}>
                        <input {...input} name={name} id={item.key} type="radio" value={item.key} /> {item.value}
                      </label>
                    </>
                  )}
                />
              </div>
            ))}
          </div>
          {/* {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>} */}
        </div>
      );
    } else if (type === 'date') {
      formField = (
        <Field
          key={name}
          name={name}
          label={label}
          validate={validations.composeValidators(...(validators || []))}
          render={props => <DateTimeControl {...props} />}
        />
      );
    }
    return formField;
  };
}
