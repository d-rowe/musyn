import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cursors from '../score/models/cursors';

const NoteDurations = () => {
  const [duration, setDuration] = useState(1024);

  useEffect(() => {
    cursors.setDuration(duration);
  }, [duration]);

  return (
    <Wrapper>
      <Button className="button is-dark" onClick={() => setDuration(512)}>
        ♪
      </Button>
      <Button className="button is-dark" onClick={() => setDuration(1024)}>
        𝅘𝅥
      </Button>
      <Button className="button is-dark" onClick={() => setDuration(2048)}>
        𝅗𝅥
      </Button>
      <Button className="button is-dark" onClick={() => setDuration(4096)}>
        𝅝
      </Button>
    </Wrapper>
  );
};

export default NoteDurations;

const Wrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 2em;
  height: 2em;
  padding: 0.25em;
  margin: 0.25em;
`;
