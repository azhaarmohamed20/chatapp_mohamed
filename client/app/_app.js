// app/_app.js

import { ChatProvider } from '@context/ChatProvider';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
  
    useEffect(() => {
      // Perform any necessary initialization or logic here
    }, []);
  
    if (router.pathname === '/chats') {
      return (
        <ChatProvider>
          <Component {...pageProps} />
        </ChatProvider>
      );
    }
  
    return <Component {...pageProps} />;
  }
  export default MyApp;