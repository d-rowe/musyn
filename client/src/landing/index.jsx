import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Landing = () => {
  const [compositionHash, setCompositionHash] = useState('');
  const [validHash, setValidHash] = useState(false);

  const redirectToHash = (hash) => {
    window.location = `/compositions/${hash}`;
  };

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

  const hashUpdate = (e) => {
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

  return (
    <Wrapper>
      {/* <h1 className="title">Welcome to Musyn</h1> */}
      <button
        type="button"
        className="button is-link is-fullwidth"
        onClick={createComposition}
      >
        New Composition
      </button>
      <div className="field has-addons">
        <div className="control">
          <input className="input" type="text" size="5" placeholder="A47P4" maxLength="5" onChange={hashUpdate} />
        </div>
        <div className="control">
          <button
            type="button"
            className="button is-link"
            onClick={() => redirectToHash(compositionHash)}
            disabled={!validHash}
          >
            Join Composition
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 4em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 7em;
`;

export default Landing;
