import { createContext, useContext } from "react";

export type AuthType = {
  isAuthenticated: any;
  user: any;
  login: any;
  logout: any;
  token: any;
};
export const AuthContext = createContext<AuthType>({
  isAuthenticated: null,
  user: null,
  login: () => null,
  logout: () => null,
  token: null,
});

export const useAuth = () => useContext(AuthContext);
