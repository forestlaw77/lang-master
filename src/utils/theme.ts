// theme.ts
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    // Add your custom colors here for both dark and light mode
    light: {
      background: "#ffffff",
      text: "#000000",
      recordBackground: "white",
    },
    dark: {
      background: "#1a202c",
      text: "#ffffff",
      recordBackground: "2d3748",
    },
  },
});

export default customTheme;
