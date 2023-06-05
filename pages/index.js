import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AppProvider, Frame, Loading } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';

export default function Home() {
  const router = useRouter();
  const [UI, setUI] = useState(
    <Frame>
      <Loading />
    </Frame>
  );

  useEffect(() => {
    try {
      // check url has shop parameter
      if (router.asPath.includes('shop')) {
        const host = new URLSearchParams(router.asPath).get('host'); // Get host from url
        // Check store data is available & app installed + valid host parameters
        if (host) {
          console.log('test3 ', host);
          const config = {
            apiKey: process.env.API_KEY,
            host: host,
            forceRedirect: true,
          };

          if (window.self !== window.top) {
            // Setup app UI
            setUI(
              <Frame>
                <h1>App installed</h1>
              </Frame>
            );
          } else {
            // If app not installed redirect to install/oAuth
            window.location.href = `https://${process.env.HOST}/api/auth${window.location.search}`;
          }
        }
      } else {
        // If shop not available in url setup install UI
        setUI(<h1>App is not installed</h1>);
      }
    } catch (e) {
      console.log('INDEX ERROR', e.message);
    }
  }, []);

  return <AppProvider i18n={translations}>{UI}</AppProvider>;
}
