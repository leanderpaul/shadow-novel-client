/**
 * Importing npm packages.
 */
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';

/**
 * Importing npm design components.
 */

/**
 * Importing user defined components.
 */
import Router from '../router/Router';
import Navbar from '../navbar/Navbar';

/**
 *  Importing user defined modules.
 */
import { AuthContext, setAuthToken, themeMode, ThemeContext, storeTheme } from '../../utils/store';

/**
 * Importing styled components.
 */
import { AppContainer, ContentContainer } from './styles';
import { DARK_THEME, LIGHT_THEME } from '../../assets/themes';

/**
 * Importing types.
 */
import type { AuthState, Auth, ThemeState } from '../../utils/store';

/**
 * Declaring constants.
 */
const queryClient = new QueryClient();
const antLightThemeCSS = <link rel='stylesheet' href='/antd.css' />;
const antDarkThemeCSS = <link rel='stylesheet' href='/antd.dark.css' />;

function App() {
  const contentRef = React.createRef<HTMLDivElement>();
  const [authState, setAuthState] = useState<AuthState>({ isAuthenticated: false, user: null });
  const [themeState, setThemeState] = useState<ThemeState>(themeMode);

  function setAuth(auth?: Auth) {
    if (auth) {
      setAuthToken(auth.token);
      return setAuthState({ isAuthenticated: true, user: auth.user });
    }
    setAuthToken(null);
    return setAuthState({ isAuthenticated: false, user: null });
  }

  function setTheme(theme: ThemeState) {
    storeTheme(theme);
    setThemeState(theme);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={[authState, setAuth]}>
        <ThemeContext.Provider value={[themeState, setTheme]}>
          <BrowserRouter>
            <ThemeProvider theme={themeState === 'light' ? LIGHT_THEME : DARK_THEME}>
              <Helmet>{themeState === 'light' ? antLightThemeCSS : antDarkThemeCSS}</Helmet>
              <AppContainer>
                <Navbar />
                <ContentContainer ref={contentRef}>
                  <Router contentRef={contentRef} />
                </ContentContainer>
              </AppContainer>
            </ThemeProvider>
          </BrowserRouter>
        </ThemeContext.Provider>
      </AuthContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
