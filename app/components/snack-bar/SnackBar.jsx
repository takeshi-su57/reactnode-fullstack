import React from 'react';
import { connect } from 'react-redux';

import { ActionTypes as types } from '../../constants';

import './SnakBar.scss';

let SnackBar = (props) => (
  <div className={`alert alert-${this.props.notify.type} ${this.props.notify.message ? 'show' : ''}`} id="snackbar">
    {this.props.notify.message}
    <button onClick={this.props.clear} type="button" className="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

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
