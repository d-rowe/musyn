import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Score from './score';
import Toolbar from './toolbar';
import composition from './score/models/composition';


const Editor = () => {
  composition.setHash(useParams().hash);

  return (
    <Wrapper className="box">
      <Toolbar />
      <Score />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 67em;
  padding: 0;
  margin: 0;
`;

export default Editor;
