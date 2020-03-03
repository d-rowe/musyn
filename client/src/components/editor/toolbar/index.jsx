import React from 'react';
import styled from 'styled-components';
import UndoButton from './buttons/undo';
import PlayButton from './buttons/play';

const Toolbar = () => (
  <Wrapper className="box toolbar">
    <UndoButton />
    <PlayButton />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 0.25em;
  margin: 0!important;
`;

export default Toolbar;
