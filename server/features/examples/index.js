/* eslint global-require: "off" */
module.exports = (app) => {
  require('./currency-convertor.routes')(app);
};
