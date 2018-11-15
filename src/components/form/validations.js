const required = value => (value ? undefined : 'Field is required');
const requiredWithMessage = message => value => (value ? undefined : message || 'Field is required');

const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);

const number = value => (value && Number.isNaN(Number(value)) ? 'Must be a number' : undefined);

const minValue = min => value => (value && value < min ? `Must be at least ${min}` : undefined);

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;

const date = value => {
  const date = new Date(value);
  const valid = date instanceof Date && !isNaN(date.valueOf());
  return valid ? undefined : 'Date is invalid';
};

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const validations = {
  composeValidators,
  required,
  requiredWithMessage,
  maxLength,
  number,
  minValue,
  email,
  date,
};

export { validations };
