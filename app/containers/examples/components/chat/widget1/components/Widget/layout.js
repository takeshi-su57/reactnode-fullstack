import React from 'react';
import { connect } from 'react-redux';

import Conversation from './components/Conversation';
import Launcher from './components/Launcher';
import './style.scss';

const WidgetLayout = props =>
  <div className={props.fullScreenMode ? 'widget-container full-screen' : 'widget-container'}>
    {
      props.showChat &&
      <Conversation
        title={props.title}
        subtitle={props.subtitle}
        sendMessage={props.onSendMessage}
        senderPlaceHolder={props.senderPlaceHolder}
        profileAvatar={props.profileAvatar}
        toggleChat={props.onToggleConversation}
        showChat={props.showChat}
        showCloseButton={props.showCloseButton}
        disabledInput={props.disabledInput}
      />
    }
    {
      !props.fullScreenMode &&
      <Launcher
        toggle={props.onToggleConversation}
      />
    }
  </div>;

export default connect(store => ({
  showChat: store.behavior.showChat,
  disabledInput: store.behavior.disabledInput
}))(WidgetLayout);
