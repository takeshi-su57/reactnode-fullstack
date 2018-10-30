import React from 'react';

export const InputFeedback = ({ error }) => (error ? <div className="input-feedback">{error}</div> : null);
