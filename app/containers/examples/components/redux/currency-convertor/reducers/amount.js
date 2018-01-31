import { ActionTypes as types } from '../constants';

const defaultState = {
  originAmount: '0.00',
  destinationAmount: '0.00',
  originCurrency: 'USD',
  destinationCurrency: 'EUR',
  conversionRate: 1.5,
  feeAmount: 0.0,
  totalCost: 0.0,
};

function amount(state = defaultState, action) {
  switch (action.type) {
    case types.CHANGE_ORIGIN_AMOUNT:
      return {
        ...state,
        originAmount: action.data.newAmount,
      };
    case types.CHANGE_DESTINATION_AMOUNT:
      return {
        ...state,
        destinationAmount: action.data.newAmount,
      };
    case types.CHANGE_ORIGIN_CURRENCY:
      return {
        ...state,
        originCurrency: action.data.newCurrency,
      };
    case types.CHANGE_DESTINATION_CURRENCY:
      return {
        ...state,
        destinationCurrency: action.data.newCurrency,
      };
    case types.RECEIVED_CONVERSION_RATE_SUCCESS:
      return {
        ...state,
        conversionRate: action.data.xRate,
        originAmount: action.data.originAmount,
        destinationAmount: action.data.destAmount,
      };
    case types.RECEIVED_FEES_SUCCESS:
      var newFeeAmount = action.data.feeAmount;
      var newTotal =
        parseFloat(state.originAmount, 10) + parseFloat(newFeeAmount, 10);

      return {
        ...state,
        feeAmount: newFeeAmount,
        totalCost: newTotal,
      };

    default:
      return state;
  }
}

export default amount;
