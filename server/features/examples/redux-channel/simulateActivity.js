const { channels, users, getRandomMessageText } = require('./db');

const { chance } = require('./constants');

const interval = 2000;
const max = 100;
let count = 0;

const simulateCreateMessage = (user) => {
    const { createMessage } = require('./main');
    if (count < max) {
        count++;
        const input = getRandomMessageText(users.map(user => user));
        const messageID = chance.guid();
        const channel = chance.pick(channels.filter(channel => channel.participants.includes(user)));
        const channelID = channel.id;
        const userID = chance.pick(channel.participants);
        createMessage({ userID, channelID, messageID, input })
    }
};

function simulateActivity(userID) {
    setInterval(simulateCreateMessage, interval, userID);
}
module.exports = {
    simulateActivity: simulateActivity
}