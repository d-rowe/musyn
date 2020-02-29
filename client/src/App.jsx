import React from 'react';
import styled from 'styled-components';
import Editor from './components/editor';

const App = () => (
  <Wrapper>
    <Editor />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2em;
  height: 100%;
  width: 100%;
  background-color: #ededed;
`;

export default App;
