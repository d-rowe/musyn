import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
const Landing = React.lazy(() => import('./components/landing'));
const Editor = React.lazy(() => import('./components/editor'));

const App = () => (
  <Router>
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
  </Router>
);

export default App;
