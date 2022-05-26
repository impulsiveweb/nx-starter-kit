import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import API from '../services/api.service';
import { AuthContext } from './login';
import { APIS } from '@utils/apis';
import getConfig from 'next/config';

const AuthProvider = ({ children, anonymous }: any) => {

  const [isBrowser, setIsBrowser] = useState(false);
  const router = useRouter();

  const setInterceptor = async () => {
    API.interceptors.response.use(
      function (response: any) {
        try {
          if (
            response &&
            response.status &&
            response.status == 5
          ) {
            logout();
            return response.data;
          }
        } catch (e) {
          console.log('Session Expired', e);
        }
        return response;
      },
      function (error: any) {
        if (error.response && [401, 402, 403].includes(error.response.status)) {
          logout();
        }
        if (error.response && error.response.status === 500) {
          // Display Error Message
        }
        return {};
      }
    );
  };

  useEffect(() => {
    setInterceptor();
    setIsBrowser(true);
  }, []);

  const login = async (email: string, password: string) => {
    const body = { email: email, password: password };
    const res: any = await API.post(APIS.AUTH.LOGIN, body);
    if (res && res.status == 1) {
      Cookies.set('token', `${res.data.token}`, { expires: 9999999 });
      Cookies.set('user', JSON.stringify(res.data.user), { expires: 9999999 });
    }
    return res;
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    setTimeout(() => {
      router.replace('/');
      router.push('/');
    }, 10);
  };

  if (!isBrowser) {
    return <></>;
  }

  const userString = Cookies.get('user');
  let user = null;
  if(userString && userString != '') {
    user = JSON.parse(userString);
  }

  const isAuthenticated = !!user;
  let allowed = true;
  let nextURL = '';
  const path = router.pathname;
  const openRoute = [getConfig().publicRuntimeConfig['WEB_LOGIN_URL']];

  if (isAuthenticated) {
    if (openRoute.indexOf(path) !== -1 || path === '/') {
      allowed = false;
      nextURL = getConfig().publicRuntimeConfig['WEB_DASHBOARD_URL'];
    }
  } else {
    if (openRoute.indexOf(path) === -1) {
      allowed = false;
      nextURL = getConfig().publicRuntimeConfig['WEB_LOGIN_URL'];
    }
  }
  if (!allowed && !anonymous) {
    router.replace(nextURL);
    return (
     <></>
    );
  }
  
  return (
    <div>
      <AuthContext.Provider
        value={{
          isAuthenticated: !!user,
          user: user,
          login,
          logout,
          token: Cookies.get('token'),
        }}
      >
        {window ? children : ''}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
