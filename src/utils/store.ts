/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing and Defining types.
 */
import { User } from '../typescript/api';

export type AuthState = { isAuthenticated: true; user: Omit<User, 'password'> } | { isAuthenticated: false; user: null };

export type Auth = { user: Omit<User, 'password'>; token: string };

export type TAuthContext = [AuthState, (auth?: Auth) => void];

/**
 * Declaring the constants.
 */
const AUTH_TOKEN_KEY = 'shadow-novel-auth-token';

export let authToken = localStorage.getItem(AUTH_TOKEN_KEY);

export const AuthContext = React.createContext<TAuthContext>([{ isAuthenticated: false, user: null }, (_auth) => {}]);
AuthContext.displayName = 'AuthContext';

export function setAuthToken(token?: string | null) {
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
  else localStorage.removeItem(AUTH_TOKEN_KEY);
  authToken = token || null;
}
