/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('ContentTexts', [
    // English
    { id: 1, languageid: 1, contentid: 1, text: 'Angular+Node' },
    { id: 2, languageid: 1, contentid: 2, text: 'Home' },
    { id: 3, languageid: 1, contentid: 3, text: 'About' },
    { id: 4, languageid: 1, contentid: 4, text: 'Login' },
    { id: 5, languageid: 1, contentid: 5, text: 'Logout' },
    { id: 6, languageid: 1, contentid: 6, text: 'Register' },
    { id: 7, languageid: 1, contentid: 7, text: 'Admin' },
    { id: 8, languageid: 1, contentid: 8, text: 'Examples' },
    // French
    { id: 9, languageid: 2, contentid: 1, text: 'Angular+Node' },
    { id: 10, languageid: 2, contentid: 2, text: 'Accueil' },
    { id: 11, languageid: 2, contentid: 3, text: 'Sur' },
    { id: 12, languageid: 2, contentid: 4, text: 'S\'identifier' },
    { id: 13, languageid: 2, contentid: 5, text: 'Connectez - Out' },
    { id: 14, languageid: 2, contentid: 6, text: 'registre' },
    { id: 15, languageid: 2, contentid: 7, text: 'Admin' },
    { id: 16, languageid: 2, contentid: 8, text: 'Traduire' },
  ], {}).catch((e) => Promise.resolve()),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ContentTexts', null, {}),
};
