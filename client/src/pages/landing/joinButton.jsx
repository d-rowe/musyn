import React, { useState } from 'react';
import axios from 'axios';
import ButtonWrapper from './buttonWrapper';
import redirectToHash from '../../helpers/redirectToHash';

const JoinButton = () => {
  const validColor = 'hsl(141, 53%, 53%)';
  const invalidColor = 'red';
  const [compositionHash, setCompositionHash] = useState('');
  const [validHash, setValidHash] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateCode = (e) => {
    const hash = e.target.value.toLowerCase();
    setCompositionHash(hash);

    if (hash.length === 5) {
      setLoading(true);

      axios.get(`/api/compositions/${hash}`)
        .then(() => setValidHash(true))
        .catch(() => setValidHash(false))
        .finally(() => setLoading(false));
    } else {
      setValidHash(false);
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

  const getStatusIcon = () => {
    if (loading) {
      return <i className="fas fa-circle-notch fa-spin" />;
    }

    if (validHash) {
      return <i className="fas fa-check" style={{ color: validColor }} />;
    }

    if (compositionHash.length === 5) {
      return <i className="fas fa-times" style={{ color: invalidColor }} />;
    }

    return <i className="fas fa-key" />;
  };

  return (
    <ButtonWrapper className="field has-addons">
      <p className="control has-icons-left has-icons-right">
        <input
          className="input is-medium"
          type="text"
          size="5"
          placeholder="A47P4"
          maxLength="5"
          onChange={updateCode}
          onKeyPress={keyPress}
          style={{
            paddingRight: '0px',
            textTransform: 'uppercase',
          }}
        />
        <span className="icon is-small is-left">
          {getStatusIcon()}
        </span>
      </p>

      <div className="control">
        <button
          type="button"
          className={`button is-medium${validHash ? ' is-success' : ''}`}
          onClick={join}
          disabled={!validHash}
        >
          Join
        </button>
      </div>
    </ButtonWrapper>
  );
};

export default JoinButton;
