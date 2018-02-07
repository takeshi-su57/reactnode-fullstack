import React, { Component } from 'react'
import { Launcher } from './Launcher';

class ChatWindowContainer extends Component {

    constructor() {
        super();
        this.state = {
            messageList: []
        };
    }

    onMessageWasSent = message => {
        this.setState({
            messageList: [...this.state.messageList, message]
        })
    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                }]
            })
        }
    }

    render() {
        return (<div>
            <Launcher
                agentProfile={{
                    teamName: 'react-live-chat',
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                onMessageWasSent={this.onMessageWasSent}
                messageList={this.state.messageList}
                showEmoji
            />
        </div>)
    }
}

export { ChatWindowContainer };