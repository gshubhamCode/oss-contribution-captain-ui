// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fontSizes: {
    xs: '0.64rem',  // 80% of default 0.8rem
    sm: '0.8rem',   // 80% of default 1rem
    md: '1rem',     // 80% of default 1.25rem
    lg: '1.12rem',  // 80% of default 1.4rem
    xl: '1.28rem',  // 80% of default 1.6rem
    '2xl': '1.6rem',// 80% of default 2rem
    '3xl': '1.92rem',
    '4xl': '2.56rem',
    '5xl': '3.2rem',
    '6xl': '4rem',
    '7xl': '5.12rem',
    '8xl': '6.4rem',
    '9xl': '8rem',
  },
  styles: {
    global: {
      'html, body': {
        fontSize: '0.90rem',  // sets base font size smaller globally
      },
    },
  },
});

export default theme;
