import React from 'react';

let FormWrapper = (ComponentToWrap, title) => props => {
  return (
    <div className="form-wrapper row justify-content-center">
      <div className="col-lg-6 col-lg-offset-3">
        <div className="card">
          <div className="card-header">{title}</div>
          <div className="card-block container">
            <ComponentToWrap {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { FormWrapper };
