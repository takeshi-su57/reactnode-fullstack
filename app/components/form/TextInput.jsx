import React from 'react';
import classnames from 'classnames';
import { InputFeedback } from './InputFeedback';
import { Label } from './Label';

const TextInput = ({ type, id, label, error, value, onChange, className, ...props }) => {
  const classes = classnames('input-group', className);

  return (
    <div className={classes}>
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <input id={id} className="text-input" type={type} value={value} onChange={onChange} {...props} />
      <InputFeedback error={error} />
    </div>
  );
};

export { TextInput };
