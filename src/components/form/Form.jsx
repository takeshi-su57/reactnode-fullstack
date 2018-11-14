import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

import { DateTimeControl } from './DateTimeControl';
import { validations } from './validations';

const getFormField = (config, model) => {
  let formField = null;
  const { name, label, type, placeholder, validators } = config;
  if (type === 'text' || type === 'password' || type === 'email' || type === 'number') {
    formField = (
      <Field key={name} name={name} validate={validations.composeValidators(...(validators || []))}>
        {({ input, meta }) => (
          <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
              {...input}
              id={name}
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
  } else if (type === 'select') {
    formField = (
      <Field
        key={name}
        name={name}
        validate={validations.composeValidators(...(validators || []))}
        render={({ input, meta }) => (
          <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Field
              component="select"
              id={name}
              name={name}
              value={model[name]}
              className={`form-control ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}
            >
              <option value="">Please select...</option>
              {(config.options || []).map(option => (
                <option key={`${name}-${option.key}`} value={option.key}>
                  {option.value}
                </option>
              ))}
            </Field>
            {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
          </div>
        )}
      />
    );
  } else if (type === 'multiselect') {
    formField = (
      <Field
        key={name}
        name={name}
        multiple
        validate={validations.composeValidators(...(validators || []))}
        render={({ input, meta }) => (
          <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
              {...input}
              id={name}
              name={name}
              multiple
              className={`form-control ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}
            >
              {(config.options || []).map(option => (
                <option key={`${name}-${option.key}`} value={option.key}>
                  {option.value}
                </option>
              ))}
            </select>
            {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
          </div>
        )}
      />
    );
  } else if (type === 'textarea') {
    formField = (
      <Field key={name} name={name} validate={validations.composeValidators(...(validators || []))}>
        {({ input, meta }) => (
          <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <textarea
              {...input}
              id={name}
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
      <Field key={name} name={name} type="checkbox" validate={validations.composeValidators(...(validators || []))}>
        {({ input, meta }) => (
          <div className="form-group">
            <div className="form-check">
              <input
                {...input}
                id={name}
                className={`form-check-input ${meta.touched &&
                  ((meta.invalid && 'is-invalid') || (meta.valid && 'is-valid'))}`}
                type="checkbox"
              />{' '}
              <label htmlFor={name} className="form-check-label">
                {label}
              </label>
              {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
            </div>
          </div>
        )}
      </Field>
    );
  } else if (type === 'checkboxlist') {
    formField = (
      <div className="form-group" key={name}>
        <label htmlFor={name}>{label}</label>
        <div>
          <Field
            name={name}
            type="checkbox"
            validate={validations.composeValidators(...(validators || []))}
            value={model[name]}
          >
            {({ input, meta }) => (
              <>
                {(config.options || []).map(item => (
                  <div className="form-check form-check-inline" key={`${name}-${item.key}`}>
                    <label className="form-check-label" htmlFor={item.key}>
                      <Field name={name} component="input" id={item.key} type="checkbox" value={item.key} />{' '}
                      {item.value}
                    </label>
                  </div>
                ))}
                {meta.touched &&
                  meta.error && (
                    <div style={{ display: 'block' }} className="invalid-feedback">
                      {meta.error}
                    </div>
                  )}
              </>
            )}
          </Field>
        </div>
      </div>
    );
  } else if (type === 'radiolist') {
    formField = (
      <div className="form-group" key={name}>
        <label htmlFor={name}>{label}</label>
        <div>
          <Field
            value={model[name]}
            validate={validations.composeValidators(...(validators || []))}
            name={name}
            type="radio"
          >
            {({ input, meta }) => (
              <>
                {(config.options || []).map(item => (
                  <div className="form-check form-check-inline" key={`${name}-${item.key}`}>
                    <label className="form-check-label" htmlFor={item.key}>
                      <Field name={name} component="input" id={item.key} type="radio" value={item.key} /> {item.value}
                    </label>
                  </div>
                ))}
                {meta.touched &&
                  meta.error && (
                    <div style={{ display: 'block' }} className="invalid-feedback">
                      {meta.error}
                    </div>
                  )}
              </>
            )}
          </Field>
        </div>
      </div>
    );
  } else if (type === 'date') {
    formField = (
      <Field
        key={name}
        name={name}
        label={label}
        value={model[name]}
        validate={validations.composeValidators(...(validators || []))}
        render={props => <DateTimeControl {...props} />}
      />
    );
  } else if (type === 'file') {
    formField = (
      <Field
        key={name}
        name={name}
        label={label}
        validate={validations.composeValidators(...(validators || []))}
        render={({ input, meta }) => (
          <>
            <div className="form-group">
              <label htmlFor={name}>{label}</label>
              <input {...input} type="file" className="form-control-file" id={name} />
            </div>
            {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
          </>
        )}
      />
    );
  }
  return formField;
};

const renderFields = (config, model) => config.map(c => getFormField(c, model));
class AppForm extends Component {
  render() {
    const { model, config, onSubmit } = this.props;
    return (
      <>
        <Form
          onSubmit={onSubmit}
          initialValues={model}
          render={({ handleSubmit, pristine, invalid, form, values, submitting }) => (
            <form onSubmit={handleSubmit}>
              {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
              {renderFields(config, model)}
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
}

export { AppForm, renderFields };
