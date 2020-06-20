import React from 'react';
import styled from 'styled-components';
import Score from './score';
import Toolbar from './toolbar';


const Editor = () => (
  <Wrapper>
    <Toolbar />
    <Score />
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
`;

export default Editor;
