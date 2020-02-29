import React from 'react';
import styled from 'styled-components';
import Score from './score/index';

const Editor = () => (
  <Wrapper className="box">
    <Score />
  </Wrapper>
);

const Wrapper = styled.div`
  width: 40em;
  height: 20em;
`;

export default Editor;
