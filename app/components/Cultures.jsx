import React, { Component } from 'react';
import { connect } from 'react-redux';

class Cultures extends Component {
  render() {
    const { cultures } = this.props;
    return cultures.map((c) => (
      <form action="/api/setlanguage" method="post" key={c.value} style={{ display: 'inline' }}>
        <input
          id={c.value}
          name="culture"
          value={c.value}
          type="submit"
          className={`submitLink${c.current ? ' active' : ''}`}
        />
      </form>
    ));
  }
}

function mapStateToProps(state) {
  const { cultures } = state.appData;
  return {
    cultures,
  };
}

Cultures = connect(mapStateToProps)(Cultures);

export { Cultures };
