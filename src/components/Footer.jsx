import React from 'react';

const Footer = ({ content }) => (
  <footer className="footer">
    <div className="container">&copy; 2018 {content.app_title}</div>
  </footer>
);

export { Footer };
