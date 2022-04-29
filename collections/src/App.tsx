import React, { useReducer } from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Authorisation from './Pages/Authorisation/Authorisation';
import Notfoundpage from './Pages/Notfoundpage';
import { initialState } from './app/context/Reducer';
import { StateReducer } from './types';
import { reducer } from './app/context/Reducer';
import { AppContext } from './app/context/AppContext';
import { Header } from './Components/Header/Header';
import { IntlProvider } from 'react-intl';
import { messages } from './shared/messages/messages';
import Collections from './Pages/Collections/Collections';
import { AdminPanel } from './Pages/AdminPanel/AdminPanel';
import routes from './shared/constants/routes';
import { DrawerSettings } from './Components/DrawerSettings/DrawerSettings';

import { ThemeProvider } from '@mui/material/styles';
import { SearchModal } from './Components/SearchModal/SearchModal';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState as StateReducer);
  return (
    <>
      <ThemeProvider theme={state.theme}>
        <CssBaseline enableColorScheme />
        <IntlProvider locale={state.currentLocale} messages={messages[state.currentLocale]}>
          <AppContext.Provider value={{ state, dispatch }}>
            <Header />
            <SearchModal />
            <Routes>
              <Route path={routes.HOME} element={<Homepage />} />
              <Route path={routes.AUTHORISATION} element={<Authorisation />} />
              <Route path={routes.COLLECTIONS} element={<Collections />} />
              <Route path={routes.ADMIN} element={<AdminPanel />} />
              <Route path="*" element={<Notfoundpage />} />
            </Routes>
            <DrawerSettings />
          </AppContext.Provider>
        </IntlProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
