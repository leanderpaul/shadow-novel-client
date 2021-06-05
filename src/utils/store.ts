/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing and Defining types.
 */
import { User } from '../typescript/api';

export type AuthState = { isAuthenticated: true; user: Omit<User, 'password'> } | { isAuthenticated: false; user: null };

export type Auth = { user: Omit<User, 'password'>; token?: string };

export type TAuthContext = [AuthState, (auth?: Auth) => void];

export type ThemeMode = 'light' | 'dark';

export type ThemeState = 'light' | 'dark';

export type TThemeContext = [ThemeState, (theme: ThemeState) => void];

/**
 * Declaring the constants.
 */
const AUTH_TOKEN_KEY = 'shadow-novel-auth-token';

const THEME_KEY = 'shadow-novel-theme';

const SERVER_URL_KEY = 'shadow-novel-server-url';

export let authToken = localStorage.getItem(AUTH_TOKEN_KEY);

export let themeMode = (localStorage.getItem(THEME_KEY) as ThemeMode) || 'light';

export let serverURL = localStorage.getItem(SERVER_URL_KEY) || '';

export const AuthContext = React.createContext<TAuthContext>([{ isAuthenticated: false, user: null }, (_auth) => {}]);
AuthContext.displayName = 'AuthContext';

export const ThemeContext = React.createContext<TThemeContext>(['light', (_theme) => {}]);
ThemeContext.displayName = 'ThemeContext';

export function setAuthToken(token?: string | null) {
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
  else localStorage.removeItem(AUTH_TOKEN_KEY);
  authToken = token || null;
}

export function storeTheme(theme: ThemeMode) {
  localStorage.setItem(THEME_KEY, theme);
}

export function setServerURL(serverUrl: string) {
  localStorage.setItem(SERVER_URL_KEY, serverUrl);
  serverURL = serverUrl;
}
