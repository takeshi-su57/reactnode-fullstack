const required = value => (value ? undefined : 'Field is required');

const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);

const number = value => (value && Number.isNaN(Number(value)) ? 'Must be a number' : undefined);

const minValue = min => value => (value && value < min ? `Must be at least ${min}` : undefined);

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;

const validations = {
  required,
  maxLength,
  number,
  minValue,
  email,
};

export { validations };
