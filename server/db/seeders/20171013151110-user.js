/* eslint-disable */

const Model = require('../models').User;

const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface, Sequelize) => Model.count().then((count) => {
    if (count < 1) {
      const salt = bcrypt.genSaltSync();
      return queryInterface.bulkInsert('Users', [
        {
          email: 'asadazmat@gmail.com',
          username: 'asahi',
          firstName: 'Asad',
          lastName: 'Sahi',
          password: bcrypt.hashSync('P@ssw0rd!', salt),
          provider: 'local',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'user@user.com',
          username: 'user',
          firstName: 'Normal',
          lastName: 'User',
          password: bcrypt.hashSync('P@ssw0rd!', salt),
          provider: 'local',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'guest@guest.com',
          username: 'guest',
          firstName: 'Guest',
          lastName: 'User',
          password: bcrypt.hashSync('P@ssw0rd!', salt),
          provider: 'local',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  }),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
