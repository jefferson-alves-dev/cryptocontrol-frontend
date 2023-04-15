import { requestClientSideAPI } from '@/services/fetchClientSide';
import { getCookie, setCookie } from 'cookies-next';
import { createContext, useState } from 'react';

type Children = {
  children: React.ReactNode;
};

type ValueProvider = {
  isAuthenticated: boolean;
  accessToken: string | boolean | null | undefined;
  setAccessToken: (accessToken: string) => void;
  refreshToken: string | boolean | null | undefined;
  setRefreshToken: (refreshToken: string) => void;
  signIn: (email: string, password: string) => Promise<boolean>;
};

export const AuthContext = createContext({} as ValueProvider);

export function AuthProvider({ children }: Children) {
  const userToken = {
    accessToken: getCookie('accessToken'),
    refreshToken: getCookie('refreshToken'),
  };

  const [accessToken, setAccessToken] = useState(userToken.accessToken);
  const [refreshToken, setRefreshToken] = useState(userToken.refreshToken);
  const isAuthenticated = !!accessToken;

  const signIn = async (email: string, password: string) => {
    const responseLogin = await fetch('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (responseLogin.status === 200) {
      const { accessToken, refreshToken } = await responseLogin.json();
      setCookie('accessToken', accessToken, {
        maxAge: 60 * 60 * 24, // 24hr
      });
      setCookie('refreshToken', refreshToken, {
        maxAge: 60 * 60 * 36, // 36hr
      });
      requestClientSideAPI.defaults.headers[
        'authorization'
      ] = `Bearer ${accessToken}`;
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
