const { Channel, channels } = require('./Channel');
let { User, users } = require('./User');
const { getRandomMessageText } = require('./initializeDB');

module.exports = {
    Channel, channels, User, users, getRandomMessageText
}