import React, { Component } from 'react';

class Cultures extends Component {
  render() {
    const { cultures } = this.props;
    return cultures.map(c => (
      <form action="/api/setlanguage" method="post" key={c.value} style={{ display: 'inline' }}>
        <input
          id={c.value}
          name="culture"
          value={c.value}
          type="submit"
          className={`culture-form submitLink${c.current ? ' active' : ''}`}
        />
      </form>
    ));
  }
}

export { Cultures };
