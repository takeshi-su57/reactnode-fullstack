import React from 'react';
import { connect } from 'react-redux';

import { ActionTypes as types } from 'constants';

import './SnakBar.scss';

let SnackBar = (props) => {
  let { notify } = props;
  return (
    <div className={`alert alert-${notify.type} ${notify.message ? 'show' : ''}`} id="snackbar">
      {notify.message}
      <button onClick={notify.clear} type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
};

const mapStateToProps = (state) => ({
  notify: state.notify,
});

const mapDispatchToProps = (dispatch) => ({
  clear() {
    dispatch({ type: types.NOTIFY_CLEAR });
  },
});

SnackBar = connect(mapStateToProps, mapDispatchToProps)(SnackBar);

export { SnackBar };
