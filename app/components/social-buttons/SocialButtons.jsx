import React, { Component } from 'react';

class SocialButtons extends Component {
  redirect = provider => {
    window.location.href = `api/auth/${provider}`;
  };

  render() {
    return (
      <div>
        {['google', 'facebook'].map(provider => (
          <button
            className="button button-outline"
            type="button"
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
