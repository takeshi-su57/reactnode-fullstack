import React from 'react';

import Widget from './components/Widget';

const ChatWidget1 = props =>
  <Widget
    title={props.title}
    subtitle={props.subtitle}
    handleNewUserMessage={props.handleNewUserMessage}
    senderPlaceHolder={props.senderPlaceHolder}
    profileAvatar={props.profileAvatar}
    showCloseButton={props.showCloseButton}
    fullScreenMode={props.fullScreenMode}
  />

ChatWidget1.defaultProps = {
  title: 'Welcome',
  subtitle: 'This is your chat subtitle',
  senderPlaceHolder: 'Type a message...',
  showCloseButton: true,
  fullScreenMode: false
};

export { ChatWidget1 };
