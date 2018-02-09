import React from 'react';
import { getStore } from './getStore';
import { Provider } from 'react-redux';

const store = getStore();

import {
    ContactListContainer,
    CurrentUserContainer,
    ChannelListContainer,
    ChannelContentContainer,
    CurrentChannelTextInputContainer
} from './components';

const Main = () => (
    <div>
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">Redux Messenger</a>
                </div>
            </div>
        </nav>
        <div className="row">
            <div className="col-md-3">
                <div>
                    <ChannelListContainer />
                </div>
            </div>
            <div className="col-md-6">
                <div>
                    <ChannelContentContainer />
                </div>
                <div>
                    <CurrentChannelTextInputContainer />
                </div>

            </div>
            <div className="col-md-3">
                <div>
                    <CurrentUserContainer />
                </div>
                <div>
                    <ContactListContainer />
                </div>
            </div>
        </div>
    </div>
);

const ReduxChannel = () => (
    <Provider store={store}>
        <Main state={store.getState()} />
    </Provider>
)
export { ReduxChannel };
