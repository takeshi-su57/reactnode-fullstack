import React from 'react';

class FeesTable extends React.Component {
  render() {
    const {
      conversionRate,
      fee,
      total,
      originCurrency,
      destinationCurrency
    } = this.props;

    return (
      <div>
        <table className="table">
          <tbody>
            <tr>
              <td>Conversion Rate</td>
              <td>
                1 {originCurrency} -> {conversionRate.toFixed(2)}{' '}
                {destinationCurrency}
              </td>
            </tr>
            <tr>
              <td>Fee</td>
              <td>
                {fee.toFixed(2)} {originCurrency}
              </td>
            </tr>
            <tr>
              <td className="total-label">Total Cost</td>
              <td>
                {total.toFixed(2)} {originCurrency}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default FeesTable;
