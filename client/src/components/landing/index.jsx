import React from 'react';
import styled from 'styled-components';
import CompositionCounter from './compositionCounter';
import CreateButton from './create/createButton';
import JoinButton from './joinButton';

const Landing = () => (
  <Wrapper>
    <CompositionCounter />
    <CreateButton />
    <JoinButton />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Landing;
