import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Landing from './landing';
import Editor from './editor';
import Navbar from './layout/navbar';

const App = () => (
  <Router>
    <Wrapper>
      <Navbar />
      <Switch>
        <Route path="/compositions/:hash">
          <Editor />
        </Route>
        <Router path="/">
          <Landing />
        </Router>
      </Switch>
    </Wrapper>
  </Router>
);

// TODO: Use a proper grid system
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default App;
