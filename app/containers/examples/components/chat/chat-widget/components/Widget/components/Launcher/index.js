import React from 'react';
import { connect } from 'react-redux';

import openLauncher from '../../../../assets/launcher_button.svg';
import close from '../../../../assets/clear-button.svg';
import './style.scss';

const Launcher = ({ toggle, chatOpened }) =>
  <button type="button" className={chatOpened ? 'launcher hide-sm' : 'launcher'} onClick={toggle}>
    {
      chatOpened ?
        <img src={close} className="close-launcher" alt="" /> :
        <img src={openLauncher} className="open-launcher" alt="" />
    }
  </button>;

export default connect(store => ({
  chatOpened: store.behavior.showChat
}))(Launcher);
