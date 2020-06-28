import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../../../../components/general/modal';
import Card from '../../../../components/general/card';
import getHash from '../../../../helpers/getHash';

const ShareButton = () => {
  const [hasOpened, setHasOpened] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (hasOpened && !active) {
      setActive(true);
    }
  }, [active]);

  const toggle = () => {
    if (hasOpened) {
      setActive(false);
    } else {
      setActive(true);
      setHasOpened(true);
    }
  };

  return (
    <>
      <Modal active={active}>
        <Card
          title="Share Composition"
          submitLabel="Back"
          onSubmit={() => {
            setHasOpened(false);
            setActive(false);
          }}
        >
          <p>Your composition code is:</p>
          <h2 className="subtitle">{getHash().toUpperCase()}</h2>
          <p>Your composition can also be shared with this url:</p>
          <a href={window.location.href}>{window.location.href}</a>
          <br />
          <br />
        </Card>
      </Modal>
      <Button className="button is-light" onClick={toggle}>
        <strong>Share</strong>
      </Button>
    </>
  );
};

const Button = styled.div`
  height: 2em;
  padding: 0.25em;
  margin: 0.25em;
`;

export default ShareButton;
