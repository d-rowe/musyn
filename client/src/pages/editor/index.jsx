import React, { useState, useReducer } from 'react';
import styled from 'styled-components';
import Score from './score';
import Toolbar from './toolbar';
import ToneSelector, { toneReducer } from './toolbar/tone_popup/tone_selector';

const initialState = {isOpen: false};

const Editor = () => {
  const [state, dispatch] = useReducer(toneReducer, initialState);
  return (
    <Wrapper>
      <Toolbar toneOnClick = {() => dispatch({type: 'open'})} />
      {state.isOpen ? <ToneSelector /> : null}
      <Score />
    </Wrapper>
  )
};

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
`;

export default Editor;
