/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Contents', [
    { id: 1, key: 'TITLE' },
    { id: 2, key: 'APP_NAV_HOME' },
    { id: 3, key: 'APP_NAV_ABOUT' },
    { id: 4, key: 'APP_NAV_LOGIN' },
    { id: 5, key: 'APP_NAV_LOGOUT' },
    { id: 6, key: 'APP_NAV_REGISTER' },
    { id: 7, key: 'APP_NAV_ADMIN' },
    { id: 8, key: 'APP_NAV_EXAMPLES' },
  ], {}).catch((e) => Promise.resolve()),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Contents', null, {}),
};
