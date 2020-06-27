import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from '../../pages/login/login.page';
import Register from '../../pages/register/register.page';
import Settings from '../../pages/settings/settings.page';
import NotFound from '../../pages/not-found/not-found.page';
import MyPaths from '../../pages/my-paths/my-paths.page';
import PathEditor from '../../pages/path-editor/path-editor.page';
import PathViewer from '../../pages/path-viewer/path-viewer.page';
import Home from '../../pages/home/home.page';

import Nav from '../nav/nav.component';
import WithAuth from '../with-auth/with-auth.component';
import AllLearningPaths from '../collections/all-learning-paths/all-learning-paths.component';
import ExpandedLearningPath from '../collections/expanded-collection/expanded-collection.component';
import SavedCollections from '../collections/saved-collections/saved-collections.component';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  useEffect(() => {
    fetch('/api/checkToken')
      .then((resp) => resp.json())
      .then((data) => setLoggedInUser(data.userId));
  });
  return (
    <Router>
      <Nav loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <main>
        <Switch>
          <Route path="/register">
            <Register setLoggedInUser={setLoggedInUser} />
          </Route>

          <Route path="/login">
            <Login setLoggedInUser={setLoggedInUser} />
          </Route>

          <Route path="/settings">
            {/* To protect a route, simply wrap it with a WithAuth component */}
            <WithAuth Component={Settings} />
          </Route>

          <Route path="/collections/user/:userId">
            <AllLearningPaths userCollections loggedInUser={loggedInUser} />
          </Route>

          <Route path="/collections/:id">
            <ExpandedLearningPath loggedInUser={loggedInUser} />
          </Route>

          <Route path="/savedcollections">
            <SavedCollections loggedInUser={loggedInUser} />
          </Route>

          <Route path="/all-paths" exact>
            <AllLearningPaths loggedInUser={loggedInUser} />
          </Route>

          <Route path="/my-paths" exact>
            <WithAuth Component={MyPaths} />
          </Route>

          <Route path="/path-viewer" exact>
            <WithAuth Component={PathViewer} />
          </Route>

          <Route path="/path-editor">
            <PathEditor loggedInUser={loggedInUser} />
          </Route>

          <Route path="/" exact>
            <Home loggedInUser={loggedInUser} />
          </Route>

          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
