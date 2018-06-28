import React from 'react';

import './SnakBar.scss';

const SnackBar = props => {
  const { notify } = props;
  return (
    <div className={`alert alert-${notify.type} ${notify.message ? 'show' : ''}`} id="snackbar">
      {notify.message}
      <button onClick={notify.clear} type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export { SnackBar };
