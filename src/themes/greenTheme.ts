import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    text: {
      color: {
        primary: string;
        secondary: string;
        link: string;
      };
      fontSize: {
        primary: string;
        input: string;
        heading: string;
        button: string;
      };
    };
    background: {
      primaryColor: string;
      secondaryColor: string;
    };
  }
}

export const greenTheme: DefaultTheme = {
  text: {
    color: {
      primary: '#000000',
      secondary: '#FFFFFF',
      link: '#00A843',
    },
    fontSize: {
      primary: '16px',
      input: '20px',
      heading: '40px',
      button: '14px',
    },
  },
  background: {
    primaryColor: '#FFFFFF',
    secondaryColor: '#00A843',
  },
};
