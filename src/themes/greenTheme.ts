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
        button: string;
        heading: string;
        title: string;
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
      button: '14px',
      heading: '40px',
      title: '28px',
    },
  },
  background: {
    primaryColor: '#FFFFFF',
    secondaryColor: '#00A843',
  },
};
