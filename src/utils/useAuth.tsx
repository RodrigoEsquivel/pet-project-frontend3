import React, { useState, useContext, createContext, useEffect } from "react";
import Cookies from "universal-cookie";
import { getToken, getUserId } from "./cookies";

export interface AuthUser {
  token: string;
  userID: string;
}

export interface ProviderAuthType {
  user: AuthUser | null;
  signIn: Function;
  signOut: Function;
}

const authContext = createContext<null | ProviderAuthType>(null);

export function ProviderAuth({ children }:any){
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{ children }</authContext.Provider>
}

export function useAuth() {
  return useContext(authContext);
}

function useProviderAuth():ProviderAuthType{
  const [user, setUser] = useState<null | AuthUser>(null);

  const signIn = (newUser: AuthUser) => {
    return setUser(newUser);
  }

  const signOut = () => {
    const cookies = new Cookies();
    cookies.remove('token');
    cookies.remove('user_id');
    return setUser(null);
  }

  useEffect(() => {
    const token = getToken();
    const userID = getUserId();
    if(token && userID) setUser({token, userID});
  }, []);

  return {
    user,
    signIn,
    signOut
  }
}