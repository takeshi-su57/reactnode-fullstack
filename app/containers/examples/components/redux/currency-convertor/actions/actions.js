import debounce from 'lodash/debounce';
import { dataService } from '../../../../../../services';

import { ActionTypes as types } from '../constants';

export function changeOriginAmount(newAmount) {
  return {
    type: types.CHANGE_ORIGIN_AMOUNT,
    data: { newAmount },
  };
}

export function changeDestAmount(newAmount) {
  return {
    type: types.CHANGE_DESTINATION_AMOUNT,
    data: { newAmount },
  };
}

export function changeOriginCurrency(newCurrency) {
  return {
    type: types.CHANGE_ORIGIN_CURRENCY,
    data: { newCurrency },
  };
}

export function changeDestCurrency(newCurrency) {
  return {
    type: types.CHANGE_DESTINATION_CURRENCY,
    data: { newCurrency },
  };
}

export function fetchConversionRate(payload) {
  return (dispatch) => {
    makeConversionAjaxCall(payload, dispatch);
  };
}

function _makeConversionAjaxCall(payload, dispatch) {
  dispatch({ type: types.REQUEST_CONVERSION_RATE, data: payload });

  // ajax call for destination amount
  dataService.get(`/api/conversion?${mapQueryParam(payload)}`)
    .then((data) => {
      dispatch({
        type: types.RECEIVED_CONVERSION_RATE_SUCCESS,
        data: data.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.RECEIVED_CONVERSION_RATE_FAILURE, data: err });
    });
}

var makeConversionAjaxCall = debounce(_makeConversionAjaxCall, 300);

export function fetchConversionRateAndFees(payload) {
  return (dispatch) => {
    makeConversionAndFeesAjaxCalls(payload, dispatch);
  };
}

function _makeConversionAndFeesAjaxCalls(payload, dispatch) {
  dispatch({ type: types.REQUEST_CONVERSION_RATE, data: payload });

  // ajax call for destination amount
  dataService.get(`/api/conversion?${mapQueryParam(payload)}`)
    .then((data) => {
      dispatch({
        type: types.RECEIVED_CONVERSION_RATE_SUCCESS,
        data: data.data,
      });

      const feePayload = Object.assign({}, payload, {
        originAmount: data.data.originAmount,
      });
      dispatch(fetchFees(feePayload));
    })
    .catch((err) => {
      dispatch({ type: types.RECEIVED_CONVERSION_RATE_FAILURE, data: err });
    });
}

var makeConversionAndFeesAjaxCalls = debounce(
  _makeConversionAndFeesAjaxCalls,
  300
);

export function fetchFees(payload) {
  return (dispatch) => {
    makeFeeAjaxCall(payload, dispatch);
  };
}

function _makeFeeAjaxCall(payload, dispatch) {
  dispatch({ type: types.REQUEST_FEES, data: payload });

  // ajax call for destination amount
  dataService.get(`/api/fees?${mapQueryParam(payload)}`)
    .then((data) => {
      dispatch({ type: types.RECEIVED_FEES_SUCCESS, data: data.data, });
    })
    .catch((resp) => {
      const msg = getErrorMsg(resp);
      dispatch({
        type: types.RECEIVED_AJAX_CALL_FAILURE,
        data: { msg, failedCall: 'fees' },
      });
    });
}

var makeFeeAjaxCall = debounce(_makeFeeAjaxCall, 300);

/** *****************
 * HELPERS
 ****************** */

// we'll handle all failures the same
function getErrorMsg(resp) {
  let msg = 'Error. Please try again later.';

  if (resp && resp.request && resp.request.status === 0) {
    msg = 'Oh no! App appears to be offline.';
  }

  return msg;
}

function mapQueryParam(paramsObj) {
  const esc = encodeURIComponent;
  const query = Object.keys(paramsObj)
    .map((k) => `${esc(k)}=${esc(paramsObj[k])}`)
    .join('&');

  return query;
}
