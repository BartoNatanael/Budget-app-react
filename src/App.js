import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ReactQueryConfigProvider } from 'react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {ThemeProvider } from 'styled-components';
import theme from 'utils/theme';
import GlobalStyles from './index.css.js';

import { Navigation, Wrapper, LoadingIndicator, Button } from 'components';
import Budget from 'pages/Budget';

toast.configure();

function App({ budget, fetchBudget, fetchBudgetedCategories }) {

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
            <React.Suspense fallback={<LoadingIndicator/>}>
              <Budget/>
            </React.Suspense>
          </Route>
        </Switch>
        </Wrapper>
        
      </Router>
    </>
  );
}

const queryConfig = {
  suspense: true, 
  refetchAllOnWindowFocus: false,
}


function RootApp(){
  return(
    <ReactQueryConfigProvider config={queryConfig}>
      <ThemeProvider theme={theme}>
        <React.Suspense fallback={<LoadingIndicator/>}>
          <App/>
        </React.Suspense>
      </ThemeProvider>
    </ReactQueryConfigProvider>
    
  )
}

export default RootApp;
