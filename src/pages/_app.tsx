import { theme } from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { ToastProvider } from '@/contexts/toast-provider';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>MuziQ</title>
      </Head>
      <ChakraProvider theme={theme}>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
