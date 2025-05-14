import "@/styles/globals.scss";
import "@/styles/multiPlayerModal.css";

import { GoogleOAuthProvider } from '@react-oauth/google';

import '@smastrom/react-rating/style.css'

function App({ Component, pageProps }) {
  return (
    <>
      { process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID  ? (
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Component {...pageProps} />
      </GoogleOAuthProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default App;
