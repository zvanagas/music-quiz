import { defineStyleConfig, extendTheme } from '@chakra-ui/react';
import ConfettiStyles from './components/confetti/confetti.styles';

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
    ConfettiStyles,
  },
});
