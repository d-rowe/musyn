import React from 'react';
import styled from 'styled-components';
import Score from './score/index';
import UndoButton from './toolbar/undoButton';

const Editor = () => (
  <Wrapper className="box">
    <UndoButton />
    <Score />
  </Wrapper>
);

const Wrapper = styled.div`
  display: relative;
  width: 60em;
  height: 20em;
`;

export default Editor;
