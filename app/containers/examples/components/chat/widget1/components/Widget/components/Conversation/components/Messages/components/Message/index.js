import React, { PureComponent } from 'react';
import marked from 'marked';

import './styles.scss';

class Message extends PureComponent {
  render() {
    const sanitizedHTML = marked.parse(this.props.message.get('text'), { sanitize: true });

    return (
      <div className={this.props.message.get('sender')}>
        <div className="message-text" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
      </div>
    );
  }
}

export default Message;
