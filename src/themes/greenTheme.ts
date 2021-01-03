import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    text: {
      primary: {
        color: string;
        fontSize: string;
      };
      button: {
        color: string;
        fontSize: string;
      };
      heading: {
        color: string;
        fontSize: string;
      };
      textField: {
        primary: {
          color: string;
          fontSize: string;
        };
        placeholder: {
          color: string;
          fontSize: string;
          opacity: string;
        };
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
    primary: {
      color: '#000000',
      fontSize: '16px',
    },
    button: {
      color: '#FFFFFF',
      fontSize: '14px',
    },
    heading: {
      color: '#000000',
      fontSize: '40px',
    },
    textField: {
      primary: {
        color: '#000000',
        fontSize: '20px',
      },
      placeholder: {
        color: '#000000',
        fontSize: '16px',
        opacity: '0.6',
      },
    },
  },
  background: {
    primaryColor: '#FFFFFF',
    secondaryColor: '#00A843',
  },
};
