import React from 'react';
// import logo from './logo.svg';
import {ThemeProvider} from 'styled-components';
import theme from 'utils/theme';
import './App.css';

import { Navigation } from 'components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navigation/>
      </div>
    </ThemeProvider>
  );
}

export default App;
