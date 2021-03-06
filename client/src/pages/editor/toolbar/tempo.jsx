import React, { useState } from 'react';
import styled from 'styled-components';
import { Transport } from 'tone';

const Tempo = () => {
  const [bpm, setBpm] = useState(Transport.bpm.value);

  const updateBpm = (newBpm) => {
    Transport.bpm.rampTo(newBpm, 0.1);
    setBpm(newBpm);
  };

  return (
    <Wrapper>
      <Label className="has-background-light has-text-dark">{bpm}</Label>
      <Button className="button is-light" onClick={() => updateBpm(bpm - 5)}>
        <i className="fas fa-minus" />
      </Button>
      <Button className="button is-light" onClick={() => updateBpm(bpm + 5)}>
        <i className="fas fa-plus" />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-right: 1em;
`;

const Button = styled.button`
  width: 2em;
  height: 2em;
  padding: 0.25em;
  margin: 0.25em;
`;

const Label = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.3em;
  padding-left: 0.25em;
  padding-right: 0.25em;
  margin: 0.25em;
  border-radius: 4px;
  width: 2em;
`;

export default Tempo;
