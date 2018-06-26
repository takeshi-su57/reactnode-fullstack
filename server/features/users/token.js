const _ = require('lodash');
const jwt = require('jsonwebtoken');

function getAccessToken(user) {
  const userInfo = _.pick(user, [...global.appConfig.whitelistedUserFields, 'id']);
  const token = jwt.sign({ ...userInfo }, global.appConfig.Security.JWT_SECRET);
  return token;
}

module.exports = {
  getAccessToken,
};
