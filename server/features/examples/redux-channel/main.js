// const {simulateActivity} = require('./simulateActivity');
const {channels} = require('./db/Channel');
const {users} = require('./db/User');
const { getRandomMessageText } = require('./db/initializeDB');

const { chance, OFFLINE, ONLINE, AWAY } = require('./constants');
const { getDefaultState } = require('./getDefaultState');
// const handleRender = require('./serverRenderMiddleWare');
const {initializeDB} = require('./db/initializeDB');
const init = (app, options) => {
    initializeDB();
    const currentUser = chance.pick(users);

    // // Simulate a small amount of delay to demonstrate app's async features
    // app.use((req,res,next)=>{
    //     const delay = 297;
    //     setTimeout(next,delay);
    // });

    app.use('/channel/create/:channelID/:name/:participants', ({ params: { channelID, name, participants } }, res) => {
        const channel = {
            id: channelID,
            name,
            participants: JSON.parse(participants),
            messages: []
        };
        channels.push(channel);
        res.status(300).json(channel);
    });

    app.use('/channel/:id', (req, res) => {
        res.json(channels.find(channel => channel.id === req.params.id));
    });

    app.use('/user/activeChannel/:userID/:channelID', ({ params: { userID, channelID } }, res) => {
        users.find(user => user.id === userID).activeChannel = channelID;
        res.status(200).send(true);
    });

    app.use('/user/:id', (req, res) => {
        res.json(users
            .map(({ name, id }) => ({ name, id }))
            .find(user => user.id === req.params.id));
    });

    app.use('/status/:id/:status', ({ params: { id, status } }, res) => {
        if (![ONLINE, OFFLINE, AWAY].includes(status)) {
            return res.status(403).send();
        }
        const user = users
            .find(user => user.id === id);
        if (user) {
            user.status = status;
            res.status(200).send();
        } else {
            res.status(404).send();
        }
    });

   
    app.use('/input/submit/:userID/:channelID/:messageID/:input', ({ params: { userID, channelID, messageID, input } }, res) => {
        const user = users.find(user => user.id === userID);

        if (!user) {
            return res.status(404).send();
        }

        createMessage({ userID, channelID, messageID, input, io: options.io });
        res.status(300).send();
    });

    // Temp middleware
    app.use('/api/reduxchanneldata', (req, res) => {
        return res.json(getDefaultState(currentUser));
    });

    // app.use(express.static('public/css'));
    // app.use('/', handleRender(() => getDefaultState(currentUser)));

    // const port = 9000;

    // server.listen(port, () => {
    //     console.info(`Redux Messenger is listening on port ${port}.`);
    // });

    simulateActivity(currentUser.id, options.io);
}

const createMessage = ({ userID, channelID, messageID, input, io }) => {
    const channel = channels.find(channel => channel.id === channelID);
    const message = {
        id: messageID,
        content: {
            text: input
        },
        owner: userID
    };

    channel.messages.push(message);
    io.emit("NEW_MESSAGE", { channelID: channel.id, ...message });
}

// Simulate
const interval = 2000;
const max = 100;
let count = 0;
const simulateActivity = (userId, io) => {
    const simulateCreateMessage = (user) => {
        const { createMessage } = require('./main');
        if (count < max) {
            count++;
            const input = getRandomMessageText(users.map(user => user));
            const messageID = chance.guid();
            const channel = chance.pick(channels.filter(channel => channel.participants.includes(user)));
            const channelID = channel.id;
            const userID = chance.pick(channel.participants);
            createMessage({ userID, channelID, messageID, input, io })
        }
    };

    setInterval(simulateCreateMessage, interval, userId);
};

module.exports = {
    createMessage : createMessage,
    init: init
}

