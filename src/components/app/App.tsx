/**
 * Importing npm packages.
 */
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

/**
 * Importing npm design components.
 */

/**
 * Importing user defined components.
 */
import Router from '../../containers/router/Router';
import Navbar from '../../containers/navbar/Navbar';

/**
 *  Importing user defined modules.
 */
import { AuthContext, setAuthToken } from '../../utils/store';

/**
 * Importing styled components.
 */
import { AppContainer, ContentContainer } from './styles';

/**
 * Importing types.
 */
import type { AuthState, Auth } from '../../utils/store';

/**
 * Declaring constants.
 */
const queryClient = new QueryClient();
setLogger({ error: () => {}, log: console.log, warn: console.log });

function App() {
  const [authState, setAuthState] = useState<AuthState>({ isAuthenticated: false, user: null });
  require('antd/dist/antd.css');

  function setAuth(auth?: Auth) {
    if (auth) {
      setAuthToken(auth.token);
      return setAuthState({ isAuthenticated: true, user: auth.user });
    }
    setAuthToken(null);
    return setAuthState({ isAuthenticated: false, user: null });
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={[authState, setAuth]}>
        <BrowserRouter>
          <AppContainer>
            <Navbar />
            <ContentContainer>
              <Router />
            </ContentContainer>
          </AppContainer>
        </BrowserRouter>
      </AuthContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
