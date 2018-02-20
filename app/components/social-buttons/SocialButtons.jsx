import React, { Component } from 'react';

import './SocialButtons.scss';

class SocialButtons extends Component {
  redirect = (provider) => {
    window.location.href = `api/auth/${provider}`;
  };

  loginCss = (login) => {
    if (login.toLowerCase() === 'microsoft') {
      return 'fa-windows';
    }

    if (login.toLowerCase() === 'stackexchange') {
      return 'fa-stack-exchange';
    }

    return `fa-${login.toLowerCase()}`;
  };

  render() {
    return (
      <div>
        {[
          'google',
          'facebook',
          'github',
        ].map((provider) => (
          <button
            key={provider}
            value={provider}
            onClick={() => this.redirect(provider)}
          />
        ))}
      </div>
    );
  }
}

export { SocialButtons };
