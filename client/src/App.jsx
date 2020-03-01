import React from 'react';
import styled from 'styled-components';
import Editor from './components/editor';
import Navbar from './components/layout/navbar';

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
  background-color: #dcdcdd;
`;

export default App;
