import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {ThemeProvider } from 'styled-components';
import theme from 'utils/theme';
import GlobalStyles from './index.css.js';

import { Navigation, Wrapper, LoadingIndicator, Button } from 'components';

function App() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <GlobalStyles/>
      <Router>
        <Navigation items={[
          {content: t('Homepage'), to: '/'},
          {content: t('Budget'), to: '/budget'}
        ]}
          RightElement={(
            <div>
              <Button onClick={()=>i18n.changeLanguage('pl')}>PL</Button>
              <Button onClick={()=>i18n.changeLanguage('en')}>EN</Button>
            </div>
          )}
        />

        <Wrapper>
          <Switch>
          <Route exact path="/">
            Hompepage
          </Route>
          <Route path="/budget">
            Budget page
          </Route>
        </Switch>
        </Wrapper>
        
      </Router>
    </>
  );
}

function RootApp(){
  return(
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator/>}>
        <App/>
      </React.Suspense>
    </ThemeProvider>
  )
}

export default RootApp;
