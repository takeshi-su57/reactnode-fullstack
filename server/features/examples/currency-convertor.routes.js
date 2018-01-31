// TODO: get some real values here
// bogus values...
const xRates = {
  USD_EUR: 0.94,
  EUR_USD: 1 / 1.5,

  USD_JPY: 108.81,
  JPY_USD: 1 / 108.81,


  EUR_JPY: 123.79,
  JPY_EUR: 1 / 123.79,
};

// in percentages
const fees = {
  USD_USD: 2,
  USD_EUR: 15,
  USD_JPY: 105,
  EUR_USD: 2,
  EUR_JPY: 70,
  EUR_EUR: 5,
  JPY_JPY: 2,
  JPY_USD: 26,
  JPY_EUR: 14,
};

module.exports = (app) => {
  app.get('/api/conversion', (req, res) => {
    /* eslint prefer-const: "off" */
    let {
      originAmount, originCurrency, destAmount, destCurrency,
    } = req.query;
    const calcOriginAmount = req.query.calcOriginAmount === 'true';
    const xRate = getXRate(originCurrency, destCurrency);


    // decide whether to convert TO or FROM originAmount
    if (calcOriginAmount) {
      originAmount = (parseFloat(destAmount, 10) / xRate).toFixed(2);
    } else {
      destAmount = (parseFloat(originAmount, 10) * xRate).toFixed(2);
    }

    // random timeout to simulate api response times
    setTimeout(() => {
      res.json({
        originAmount, destAmount, destCurrency, xRate,
      });
    }, getRandomResponseTime());
  });

  app.get('/api/fees', (req, res) => {
    /* eslint prefer-const: "off" */
    const { originAmount, originCurrency, destCurrency } = req.query;
    const feeAmount = getFee(originAmount, originCurrency, destCurrency);

    // random timeout to simulate api response times

    setTimeout(() => {
      const amt = req.query.originAmount.toString()[0];
      if (amt === '9') return res.send(500);

      return res.json({
        originAmount, originCurrency, destCurrency, feeAmount,
      });
    }, getRandomResponseTime());
  });

  /**
     * Helper functions
     */

  function getXRate(originCurrency, destCurrency) {
    let rate = 1;

    // if both currencies are the same, exchange rate will be 1.
    if (originCurrency === destCurrency) {
      return rate;
    }

    rate = xRates[`${originCurrency}_${destCurrency}`];
    if (!rate) {
      console.log(`ERROR: Exchange rate missing for ${originCurrency} -> ${destCurrency}`);
    }

    return rate;
  }

  // Returns fee amount (feePercentage of originAmount for transaction)
  function getFee(originAmount, originCurrency, destCurrency) {
    let feePerc = 2;

    feePerc = fees[`${originCurrency}_${destCurrency}`];

    if (!feePerc) {
      return console.log(`ERROR: Fee % missing for ${originCurrency} -> ${destCurrency}`);
    }

    /* eslint no-mixed-operators: "off" */
    return originAmount * feePerc / 100;
  }

  function getRandomResponseTime() {
    const max = 1200; // ms
    const min = 150;
    return Math.floor(Math.random() * (max - min)) + min;
  }
};
