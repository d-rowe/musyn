import React from 'react';
import styled from 'styled-components';
import Score from './score';
import Toolbar from './toolbar';


const Editor = () => (
  <Wrapper className="box">
    <Toolbar />
    <Score />
  </Wrapper>
);

const Wrapper = styled.div`
  width: 67em;
  padding: 0;
  margin: 0;
`;

export default Editor;
