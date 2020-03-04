import React from 'react';
import styled from 'styled-components';
import Editor from './editor';
import Navbar from './layout/navbar';

const App = () => (
  <Wrapper>
    <Navbar />
    <Editor />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default App;
