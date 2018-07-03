import React from 'react';

export const Tab = ({ linkClassName, isActive, iconClassName, onClick, tabIndex }) => (
  <li className="tab">
    <button
      className={`tab-link ${linkClassName} ${isActive ? 'active' : ''}`}
      type="button"
      onClick={event => {
        event.preventDefault();
        onClick(tabIndex);
      }}
    >
      <i className={`tab-icon ${iconClassName}`} />
    </button>
  </li>
);
