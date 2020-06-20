import React from 'react';
import styled from 'styled-components';
import CompositionTitle from './compositionTitle';
import NoteDurations from './noteDurations';
import UndoButton from './buttons/undo';
import PlayButton from './buttons/play';
import Tempo from './tempo';

const Toolbar = () => (
  <Wrapper className="box has-background-dark has-text-white">
    <UndoButton />
    <CompositionTitle />
    <RightTools>
      <NoteDurations />
      <Spacer />
      <PlaybackWrapper>
        <Tempo />
        <PlayButton />
      </PlaybackWrapper>
    </RightTools>
  </Wrapper>
);

const RightTools = styled.div`
  display: flex;
  align-items: right;
`;

const PlaybackWrapper = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25em;
  border-radius: 0;
`;

const Spacer = styled.div`
  width: 1em;
`;

export default Toolbar;
