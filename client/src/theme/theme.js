import { extendTheme } from "@chakra-ui/react";
export const theme = extendTheme({
  config: {
    initialColorMode: localStorage.getItem("chakra-ui-color-mode") || "dark",
  },
});
