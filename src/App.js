import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {ThemeProvider } from 'styled-components';
import theme from 'utils/theme';
import GlobalStyles from './index.css.js';

import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.action'

import { Navigation, Wrapper, LoadingIndicator, Button } from 'components';

function App({ budget, fetchBudget, fetchBudgetedCategories }) {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetedCategories(1)
  },[fetchBudget, fetchBudgetedCategories])

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

const ConnectedApp = connect(state => {
  return{
    budget: state.budget
  }
}, {
  fetchBudget,
  fetchBudgetedCategories
})(App)

function RootApp(){
  return(
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator/>}>
        <ConnectedApp/>
      </React.Suspense>
    </ThemeProvider>
  )
}

export default RootApp;
