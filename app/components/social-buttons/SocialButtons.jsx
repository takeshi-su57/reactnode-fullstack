import React, { Component } from 'react';

class SocialButtons extends Component {
  redirect = provider => {
    window.location.href = `api/auth/${provider}`;
  };

  render() {
    return (
      <div>
        {['google', 'facebook'].map(provider => [
          <button
            type="button"
            key={provider}
            className="button button-outline"
            onClick={() => this.redirect(provider)}
          >
            {provider}
          </button>,
          <span key="btnspace">&nbsp;</span>,
        ])}
      </div>
    );
  }
}

export { SocialButtons };
