import React, { PureComponent } from 'react';

import './styles.scss';

class Snippet extends PureComponent {
  render() {
    return (
      <div className="snippet">
        <h5 className="snippet-title">
          { this.props.message.get('title') }
        </h5>
        <div className="snippet-details">
          <a href={this.props.message.get('link')} target={this.props.message.get('target')} className="link">
            { this.props.message.get('link') }
          </a>
        </div>
      </div>
    );
  }
}

export default Snippet;
