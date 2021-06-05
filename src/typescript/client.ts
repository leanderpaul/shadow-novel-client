declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export interface Theme {
  type: 'light' | 'dark';
  background: {
    primary: string;
    secondary: string;
    active: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
}
