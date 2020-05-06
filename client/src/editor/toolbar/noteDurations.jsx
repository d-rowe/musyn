import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cursors from '../score/models/cursors';

const NoteDurations = () => {
  const [duration, setDuration] = useState(1024);
  const eighth = 512;
  const quarter = 1024;
  const half = 2048;
  const whole = 4096;

  useEffect(() => {
    cursors.setDuration(duration);
  }, [duration]);

  return (
    <Wrapper>
      <Button className={`button ${duration === eighth ? '' : 'is-dark'}`} onClick={() => setDuration(eighth)}>
        ♪
      </Button>
      <Button className={`button ${duration === quarter ? '' : 'is-dark'}`} onClick={() => setDuration(quarter)}>
        𝅘𝅥
      </Button>
      <Button className={`button ${duration === half ? '' : 'is-dark'}`} onClick={() => setDuration(half)}>
        𝅗𝅥
      </Button>
      <Button className={`button ${duration === whole ? '' : 'is-dark'}`} onClick={() => setDuration(whole)}>
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
