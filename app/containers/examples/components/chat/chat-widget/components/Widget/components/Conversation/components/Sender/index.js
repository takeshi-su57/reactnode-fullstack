import React from 'react';

import send from '../../../../../../assets/send_button.svg';
import './style.scss';

const Sender = ({ sendMessage, placeholder, disabledInput }) =>
  <form className="sender" onSubmit={sendMessage}>
    <input type="text" className="new-message" name="message" placeholder={placeholder} disabled={disabledInput} autoFocus autoComplete="off" />
    <button type="submit" className="send">
      <img src={send} className="send-icon" alt="send" />
    </button>
  </form>;

export default Sender;
