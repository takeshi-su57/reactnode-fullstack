/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Languages', [
    { locale: 'en-US', description: 'English' },
    { locale: 'fr-FR', description: 'French' },
  ], {}).catch((e) => Promise.resolve()),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Languages', null, {}),
};
