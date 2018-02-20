/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Contents', [
    { key: 'TITLE' },
    { key: 'APP_NAV_HOME' },
    { key: 'APP_NAV_ABOUT' },
    { key: 'APP_NAV_LOGIN' },
    { key: 'APP_NAV_LOGOUT' },
    { key: 'APP_NAV_REGISTER' },
    { key: 'APP_NAV_ADMIN' },
    { key: 'APP_NAV_EXAMPLES' },
  ], {}).catch((e) => Promise.resolve()),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Contents', null, {}),
};
