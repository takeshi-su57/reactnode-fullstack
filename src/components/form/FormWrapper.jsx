import React from 'react';

const FormWrapper = (ComponentToWrap, title) => props => (
  <div className="row">
    <div className="column">
      <h2>{title}</h2>
      <ComponentToWrap {...props} />
    </div>
  </div>
);

export { FormWrapper };
