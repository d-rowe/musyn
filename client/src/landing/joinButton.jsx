import React, { useState } from 'react';
import axios from 'axios';
import redirectToHash from '../helpers/redirectToHash';

const JoinButton = () => {
  const [compositionHash, setCompositionHash] = useState('');
  const [validHash, setValidHash] = useState(false);

  const updateCode = (e) => {
    const hash = e.target.value.toLowerCase();
    setCompositionHash(hash);

    if (hash.length === 5) {
      axios.get(`/api/compositions/${hash}`)
        .then(() => setValidHash(true))
        .catch(() => {
          setValidHash(false);
          // eslint-disable-next-line no-alert
          alert("Hmm... I'm having trouble finding that composition. Make sure you've entered it in correctly.");
        });
    }
  };

  const join = () => {
    if (validHash) {
      redirectToHash(compositionHash);
    }
  };

  const keyPress = (e) => {
    if (e.key === 'Enter') {
      join();
    }
  };

  return (
    <div className="field has-addons">
      <div className="control">
        <input
          className="input"
          type="text"
          size="5"
          placeholder="A47P4"
          maxLength="5"
          onChange={updateCode}
          onKeyPress={keyPress}
        />
      </div>
      <div className="control">
        <button
          type="button"
          className="button is-link"
          onClick={join}
          disabled={!validHash}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinButton;
