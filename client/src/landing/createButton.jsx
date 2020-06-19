import React from 'react';
import axios from 'axios';
import redirectToHash from '../helpers/redirectToHash';

const createComposition = () => {
  axios.post('/api/compositions')
    .then((response) => response.data)
    .then(({ hash }) => redirectToHash(hash))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
      // eslint-disable-next-line no-alert
      alert('Encountered problem creating composition');
    });
};

const CreateButton = () => (
  <button
    type="button"
    className="button is-link"
    onClick={createComposition}
  >
    New Composition
  </button>
);

export default CreateButton;
