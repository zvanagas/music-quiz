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
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </>
  );
};

export default App;
