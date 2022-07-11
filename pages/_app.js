import { ProductProvider } from '../state/context/productContext';
import { UserProvider } from '@auth0/nextjs-auth0';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ProductProvider>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ProductProvider>
  );
}

export default MyApp;
