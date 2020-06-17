import React from 'react';
import axios from 'axios';

const Landing = () => {
  const createComposition = () => {
    axios.post('/api/compositions')
      .then((response) => response.data)
      .then(({ hash }) => { window.location = `/compositions/${hash}`; })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(err);
        // eslint-disable-next-line no-alert
        alert('Encountered problem creating composition');
      });
  };

  return (
    <div>
      <h1 className="title">Welcome to Musyn</h1>
      <button
        type="button"
        className="button"
        onClick={createComposition}
      >
        Create Composition
      </button>
      <button type="button" className="button">Join Composition</button>
    </div>
  );
};

export default Landing;
