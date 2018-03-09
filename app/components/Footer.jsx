import React from 'react';

const Footer = (props) => (
  <footer className="footer">
    <span>
      {props.content.app_description}
    </span>
  </footer>
);


export { Footer };
