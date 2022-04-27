import React, { useReducer } from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Authorisation from './Pages/Authorisation';
import Notfoundpage from './Pages/Notfoundpage';
import { initialState } from './app/context/Reducer';
import { StateReducer } from './types';
import { reducer } from './app/context/Reducer';
import { AppContext } from './app/context/AppContext';
import { Header } from './Components/Header/Header';
import { IntlProvider } from 'react-intl';
import { messages } from './shared/messages/messages';
import Collections from './Pages/Collections/Collections';
import AdminPanel from './Pages/AdminPanel/AdminPanel';

function App() {
  console.log(messages['ru']);
  const [state, dispatch] = useReducer(reducer, initialState as StateReducer);
  return (
    <>
      <CssBaseline enableColorScheme />
      <IntlProvider locale={state.currentLocale} messages={messages[state.currentLocale]}>
        <AppContext.Provider value={{ state, dispatch }}>
          <Header />

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/authorisation" element={<Authorisation />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<Notfoundpage />} />
          </Routes>
        </AppContext.Provider>
      </IntlProvider>
    </>
  );
}

export default App;
