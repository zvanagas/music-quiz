import { defineStyleConfig, extendTheme } from '@chakra-ui/react';

const Button = defineStyleConfig({
  baseStyle: {
    whiteSpace: 'normal',
  },
  sizes: {
    xl: {
      fontSize: 'l',
      boxSize: 150,
    },
  },
});

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  components: {
    Button,
  },
});
