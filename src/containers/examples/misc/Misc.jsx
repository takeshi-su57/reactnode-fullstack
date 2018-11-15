import React, { useState, useEffect } from 'react';

const Misc = () => {
  let [count, setCount] = useState(0);
  useEffect(
    () => {
      document.title = `NgNode ${count}`;
      return () => {
        document.title = 'NgNode';
      };
    },
    [count]
  );
  return (
    <>
      <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
        {count > 0 ? `Clicked ${count} times` : 'Click me'}
      </button>
    </>
  );
};

export default Misc;
