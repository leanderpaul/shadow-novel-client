import type { Theme } from '../typescript/client';

export const LIGHT_THEME: Theme = {
  type: 'light',
  background: {
    primary: '#f3f3f3',
    secondary: '#fff',
    active: 'rgba(255, 255, 255, 0.05)'
  },
  text: {
    primary: '#000',
    secondary: '#555'
  }
};

export const DARK_THEME: Theme = {
  type: 'dark',
  background: {
    primary: '#303030',
    secondary: '#141414',
    active: 'rgba(0, 0, 0, 0.95)'
  },
  text: {
    primary: '#fff',
    secondary: '#777'
  }
};
