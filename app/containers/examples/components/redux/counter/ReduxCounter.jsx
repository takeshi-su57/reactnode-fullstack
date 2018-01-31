import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from './counter';

let ReduxCounter = props => (
  <div className="col-12">
    <p>Count: {props.count}</p>

    <div className="btn-group">
      <button
        className="btn btn-sm btn-primary"
        onClick={props.increment}
        disabled={props.isIncrementing}
      >
        Increment
      </button>
      <button
        className="btn btn-sm btn-secondary"
        onClick={props.incrementAsync}
        disabled={props.isIncrementing}
      >
        Increment Async
      </button>
    </div>

    <br />
    <br />

    <div className="btn-group">
      <button
        className="btn btn-sm btn-primary"
        onClick={props.decrement}
        disabled={props.isDecrementing}
      >
        Decrement
      </button>
      <button
        className="btn btn-sm btn-secondary"
        onClick={props.decrementAsync}
        disabled={props.isDecrementing}
      >
        Decrement Async
      </button>
    </div>

    <div>
      <button className="btn btn-sm" onClick={() => props.changePage()}>
        Go to examples page via redux
      </button>
    </div>
  </div>
);

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push('/examples')
    },
    dispatch
  );

ReduxCounter = connect(mapStateToProps, mapDispatchToProps)(ReduxCounter);

export { ReduxCounter };
