import React, { useReducer } from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Pages/HomePage/Homepage';
import Authorisation from './Pages/Authorisation/Authorisation';
import Notfoundpage from './Pages/Page404/Notfoundpage';
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
import { CreateCollection } from './Pages/Collections/CreateCollection/CreateCollection';
import { ViewCollection } from './Pages/Collections/ViewCollection/ViewCollection';
import { EditCollection } from './Pages/Collections/EditCollection/EditCollection';
import { StyledEngineProvider } from '@mui/material/styles';
import { ViewItem } from './Pages/Collections/ViewCollection/ViewItem/ViewItem';
import { Search } from './Pages/Search/Search';
import { SearchByTag } from './Pages/SearchByTag/SearchByTag';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState as StateReducer);
  return (
    <>
      <ThemeProvider theme={state.theme}>
        <CssBaseline enableColorScheme />
        <IntlProvider locale={state.currentLocale} messages={messages[state.currentLocale]}>
          <AppContext.Provider value={{ state, dispatch }}>
            <StyledEngineProvider injectFirst>
              <Header />
              <Routes>
                <Route path={routes.HOME} element={<Homepage />} />
                <Route path={routes.AUTHORISATION} element={<Authorisation />} />
                <Route path={routes.COLLECTIONS} element={<Collections />} />
                <Route path={routes.COLLECTION_CREATE} element={<CreateCollection />} />
                <Route path={routes.SEARCH} element={<Search />} />
                <Route path={routes.SEARCH_BY_TAG} element={<SearchByTag />} />
                <Route path={routes.COLLECTION_BY_ID} element={<ViewCollection />}>
                  <Route path={routes.COLLECTION_ITEM} element={<ViewItem />} />
                </Route>
                <Route path={routes.COLLECTION_EDIT} element={<EditCollection />} />
                <Route path={routes.ADMIN} element={<AdminPanel />} />
                <Route path="*" element={<Notfoundpage />} />
              </Routes>
              <DrawerSettings />
            </StyledEngineProvider>
          </AppContext.Provider>
        </IntlProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
