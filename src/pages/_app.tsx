import type { AppProps } from 'next/app';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Layout } from '../components/Layout';
import { command } from '../services/cq.service';
import { AuthInterface, AuthContext } from '../common/auth';

function MyApp({ Component, pageProps }: AppProps) {
  const [authState, setAuthState] = useState<AuthInterface>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    setContext: () => {},
  });

  const memoizedAuthState = useMemo(
    () => ({ ...authState, setContext: setAuthState as any }), 
    [authState]
  );

  const syncSession = useCallback(
    async () => {
      try {
        const commandReponse = await command('auth', 'auth.syncSession', {});
        setAuthState({ ...authState, user: commandReponse.data.user, isAuthenticated: true, isLoading: false })
      } catch (err) {
        setAuthState({ ...authState, user: null, isAuthenticated: false, isLoading: false })
      }
    },
    [],
  )

  useEffect(() => {
    syncSession()
  }, [])

  return (
    <AuthContext.Provider value={memoizedAuthState}>
      <Layout>
        {authState.isLoading && 'Loading Session'}
        {!authState.isLoading && <Component {...pageProps} />}
      </Layout>
    </AuthContext.Provider>
  );
}
export default MyApp;
