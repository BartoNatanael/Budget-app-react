import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {ThemeProvider } from 'styled-components';
import theme from 'utils/theme';
import GlobalStyles from './index.css.js';

import { Navigation } from 'components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <Router>
        <Navigation items={[
          {content: 'Homepage', to: '/'},
          {content: 'Budget', to: '/budget'}
        ]}/>
        <Switch>
          <Route exact path="/">
            Hompepage
          </Route>
          <Route path="/budget">
            Budget page
          </Route>
        </Switch>
      </Router>

    </ThemeProvider>
  );
}

export default App;
