import React from 'react';
import styled from 'styled-components';
import CompositionTitle from './compositionTitle';
import NoteDurations from './noteDurations';
import UndoButton from './buttons/undo';
import ShareButton from './buttons/share';
import PlayButton from './buttons/play';
import ToneButton from './buttons/tone';
import Tempo from './tempo';

const Toolbar = ({toneOnClick}) => (
  <Wrapper className="box has-background-dark has-text-white">
    <LeftTools>
      <UndoButton />
      <ShareButton />
      <ToneButton toneOnClick = {() => toneOnClick()} />
    </LeftTools>
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

const LeftTools = styled.div`
  display: flex;
  align-items: left;
`;

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
  flex-wrap: wrap;
`;

const Spacer = styled.div`
  width: 1em;
`;

export default Toolbar;
