import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Loading from './components/general/loading';

const Landing = React.lazy(() => import('./pages/landing'));
const Editor = React.lazy(() => import('./pages/editor'));

const App = () => (
  <Router>
    <Switch>
      <Route path="/compositions/:hash">
        <Suspense fallback={<Loading message="Digging through the library" />}>
          <Editor />
        </Suspense>
      </Route>
      <Router path="/">
        <Suspense fallback={<div />}>
          <Landing />
        </Suspense>
      </Router>
    </Switch>
  </Router>
);

export default App;
