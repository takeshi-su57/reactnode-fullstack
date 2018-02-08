/* eslint global-require: "off" */
module.exports = (app, options) => {
  require('./currency-convertor.routes')(app);
  require('./redux-channel/main').init(app, options);
};
