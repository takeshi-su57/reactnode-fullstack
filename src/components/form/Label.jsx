import React from 'react';

export const Label = ({ error, className, children, name, ...props }) => (
  <label className="label" {...props}>
    {children}
  </label>
);
