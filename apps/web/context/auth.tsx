import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import API from '../services/api.service';
import { AuthContext } from './login';;
import { APIS } from '@utils/apis';
import getConfig from 'next/config';

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [access, setAccess] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBrowser, setIsBrowser] = useState(false);
  const [interceptorId, setInterceptorId] = useState<number>(0);

  const router = useRouter();

  const setInterceptor = () => {
    API.interceptors.response.use(
      function (response: any) {
        try {
          if (
            response.data &&
            response.data.status &&
            response.data.status == 5
          ) {
            logout();
            return response;
          }
        } catch (e) {
          console.log('Session Expired', e);
        }
        return response.data;
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

  async function loadUserFromCookies() {
    const token = Cookies.get('token');
    if (token) {
      const interceptorID = await API.interceptors.request.use(
        function (config: any) {
          const token = Cookies.get('token');
          config.headers['Authorization'] = `Bearer ${token}`;
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );
      setInterceptorId(interceptorID);
      // API.defaults.headers.Authorization = `Bearer ${token}`;
      const user = Cookies.get('user');
      if (user !== undefined) {
        setUser(JSON.parse(user));
      }
      const access = Cookies.get('access');
      if (access !== undefined) {
        setAccess(JSON.parse(access));
      }
      setToken(token);
    }
    setLoading(false);
    setIsBrowser(true);
  }

  useEffect(() => {
    setInterceptor();
    loadUserFromCookies();
  }, []);

  const login = async (email: string, password: string) => {
    const body = { email: email, password: password };
    const res: any = await API.post(APIS.AUTH.LOGIN, body);
    console.log('res', res);
    if (res.status == 1) {
      Cookies.set('token', `${res.token}`, { expires: 9999999 });
      Cookies.set('user', JSON.stringify(res.user), { expires: 9999999 });
      Cookies.set('access', JSON.stringify(res.access), { expires: 9999999 });
      setUser(res.user);
      setAccess(res.access);
      setToken(res.token);
      const interceptorID = await API.interceptors.request.use(
        function (config: any) {
          config.headers['Authorization'] = `Bearer ${res.token}`;
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );
      setInterceptorId(interceptorID);
    }
    return res;
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('access');
    setUser(null);
    setAccess(null);
    setToken(null);
    router.replace(getConfig().publicRuntimeConfig['WEB_LOGIN_URL']);
    router.push(getConfig().publicRuntimeConfig['WEB_LOGIN_URL']);
    API.interceptors.request.eject(interceptorId);
  };

  if (!isBrowser) {
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: !!user,
          user,
          login,
          logout,
          loading,
          token,
        }}
      ></AuthContext.Provider>
    );
  }
  const isAuthenticated = !!user;
  let allowed = true;
  let nextURL = '';
  const path = router.pathname;
  const openRoute = [getConfig().publicRuntimeConfig['WEB_DASHBOARD_URL']];
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
  if (!allowed) {
    router.replace(nextURL);
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: !!user,
          user,
          login,
          logout,
          loading,
          token,
        }}
      ></AuthContext.Provider>
    );
  }

  return (
    <div>
      {!loading && (
        <AuthContext.Provider
          value={{
            isAuthenticated: !!user,
            user,
            login,
            logout,
            loading,
            token,
          }}
        >
          {window ? children : ''}
        </AuthContext.Provider>
      )}
    </div>
  );
};

export default AuthProvider;
