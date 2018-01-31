import React from 'react';
import { connect } from 'react-redux';

import FeesTable from './FeesTable';
import * as actions from './actions/actions';

class Conversion extends React.Component {
  constructor(props) {
    super(props);

    // bind event listeners so 'this' will be available in the handlers
    this.handleOriginAmountChange = this.handleOriginAmountChange.bind(this);
    this.handleDestAmountChange = this.handleDestAmountChange.bind(this);
    this.handleOriginCurrencyChange = this.handleOriginCurrencyChange.bind(
      this
    );
    this.handleDestCurrencyChange = this.handleDestCurrencyChange.bind(this);
  }

  componentDidMount() {
    this.originAmountInput.focus();
  }
  handleOriginCurrencyChange(event) {
    var newCurrency = event.target.value;
    this.props.dispatch(actions.changeOriginCurrency(newCurrency));

    var payload = {
      originAmount: this.props.originAmount,
      originCurrency: newCurrency,
      destCurrency: this.props.destinationCurrency,
      calcOriginAmount: false
    };

    this.props.dispatch(actions.fetchConversionRate(payload));

    var feePayload = {
      originAmount: this.props.originAmount,
      originCurrency: newCurrency,
      destCurrency: this.props.destinationCurrency
    };

    this.props.dispatch(actions.fetchFees(feePayload));
  }
  handleDestCurrencyChange(event) {
    var newCurrency = event.target.value;
    this.props.dispatch(actions.changeDestCurrency(newCurrency));

    var payload = {
      originAmount: this.props.originAmount,
      originCurrency: this.props.originCurrency,
      destCurrency: newCurrency,
      calcOriginAmount: false
    };

    this.props.dispatch(actions.fetchConversionRate(payload));

    var feePayload = {
      originAmount: this.props.originAmount,
      originCurrency: this.props.originCurrency,
      destCurrency: newCurrency
    };

    this.props.dispatch(actions.fetchFees(feePayload));
  }
  handleOriginAmountChange(event) {
    var newAmount = event.target.value;

    // remove unallowed chars
    newAmount = newAmount.replace(',', '');

    // optimistic field updates
    this.props.dispatch(actions.changeOriginAmount(newAmount));

    var payload = {
      originAmount: newAmount,
      originCurrency: this.props.originCurrency,
      destCurrency: this.props.destinationCurrency,
      calcOriginAmount: false
    };

    this.props.dispatch(actions.fetchConversionRate(payload));

    var feePayload = {
      originAmount: newAmount,
      originCurrency: this.props.originCurrency,
      destCurrency: this.props.destinationCurrency
    };

    this.props.dispatch(actions.fetchFees(feePayload));
  }
  handleDestAmountChange(event) {
    var newAmount = event.target.value;

    // remove unallowed chars
    newAmount = newAmount.replace(',', '');

    // optimistic field updates
    this.props.dispatch(actions.changeDestAmount(newAmount));

    var payload = {
      destAmount: newAmount,
      originCurrency: this.props.originCurrency,
      destCurrency: this.props.destinationCurrency,
      calcOriginAmount: true
    };

    this.props.dispatch(actions.fetchConversionRateAndFees(payload));
  }

  render() {
    if (this.props.errorMsg) {
      var errorMsg = <div className="errorMsg">{this.props.errorMsg}</div>;
    }

    return (
      <div>
        <div className="row">
          <h2>Convert</h2>
          {errorMsg}
        </div>
        <div className="row">
          <div className="col-5">
            <input
              className="form-control"
              ref={input => (this.originAmountInput = input)}
              onChange={this.handleOriginAmountChange}
              value={this.props.originAmount}
            />
            <select
              className="form-control"
              value={this.props.originCurrency}
              onChange={this.handleOriginCurrencyChange}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
          <div className="col-2">to </div>

          <div className="col-5">
            <input
              className="form-control"
              onChange={this.handleDestAmountChange}
              value={this.props.destinationAmount}
            />
            <select
              className="form-control"
              value={this.props.destinationCurrency}
              onChange={this.handleDestCurrencyChange}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <FeesTable
            originCurrency={this.props.originCurrency}
            destinationCurrency={this.props.destinationCurrency}
            conversionRate={this.props.conversionRate}
            fee={this.props.feeAmount}
            total={this.props.totalCost}
          />
        </div>
      </div>
    );
  }
}

Conversion = connect((state, props) => {
  return {
    originAmount: state.amount.originAmount,
    destinationAmount: state.amount.destinationAmount,
    originCurrency: state.amount.originCurrency,
    destinationCurrency: state.amount.destinationCurrency,
    conversionRate: state.amount.conversionRate,
    feeAmount: state.amount.feeAmount,
    totalCost: state.amount.totalCost,
    errorMsg: state.error.errorMsg
  };
})(Conversion);

export { Conversion };
