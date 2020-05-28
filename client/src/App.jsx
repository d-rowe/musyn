import React, { Suspense } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
const Editor = React.lazy(() => import('./editor'));
const Landing = React.lazy(() => import('./landing'));
import Navbar from './layout/navbar';

const App = () => (
  <Router>
    <Wrapper>
      <Navbar />
      <Switch>
        <Route path="/compositions/:hash">
          <Suspense fallback={<div>Loading...</div>}>
            <Editor />
          </Suspense>
        </Route>
        <Router path="/">
          <Suspense fallback={<div>Loading...</div>}>
            <Landing />
          </Suspense>
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
