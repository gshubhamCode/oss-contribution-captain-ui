// src/theme.ts
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",      // Default fallback
  useSystemColorMode: false,      // We'll override based on time
};

const theme = extendTheme({
  config,
  fontSizes: {
    xs: "0.64rem",
    sm: "0.8rem",
    md: "1rem",
    lg: "1.12rem",
    xl: "1.28rem",
    "2xl": "1.6rem",
    "3xl": "1.92rem",
    "4xl": "2.56rem",
    "5xl": "3.2rem",
    "6xl": "4rem",
    "7xl": "5.12rem",
    "8xl": "6.4rem",
    "9xl": "8rem",
  },
  styles: {
    global: {
      "html, body": {
        fontSize: "0.90rem",
      },
    },
  },
});

export default theme;
