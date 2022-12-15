import cookie from "js-cookie";
import Router from "next/router";
import {useDebugValue} from "react";

export const setCookie = (key, value) => {
  cookie.set(key, value, {
      expires: 1
  });
};

export const removeCookie = (key) => {
  cookie.remove(key);
};

const getCookieFromBrowser = (key) => {
    const cookieVal = cookie.get(key);
    console.log("COOKIE! FROM BROWSER", cookieVal);
    return cookieVal;
};

const getCookieFromServer = (key, req) => {
  if(!req.cookie) {
      return undefined;
  }
  let token = req.headers.cookie.split(";").find(c => c.trim().startsWith(`${key}=`));
  if(!token){
      return undefined;
  }
  let tokenValue = token.split("=")[1];
  console.log("getCookieFromServer");
  return tokenValue;
};

export const getCookie = (key, req) => {
    // console.log("getCookie!", req);
    if(req !== undefined){
        return getCookieFromServer(key, req);
    } else {
        return getCookieFromBrowser(key)
    }
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
};

export const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

export const TOKEN = "token";
export const USER = "user";

export const authenticate = (response, handleNextFn) => {
    setCookie(TOKEN, response.data.token);
    setLocalStorage(USER, response.data.user);
    handleNextFn();
};

export const isAuth = () => {
  const theCookie = getCookie(TOKEN);
  if(theCookie) {
      if(getFromLocalStorage(USER)){
          return JSON.parse(getFromLocalStorage(USER));
      } else {
          return false;
      }
  }
};

export const logout = () => {
    removeCookie(TOKEN);
    removeLocalStorage(USER);
    Router.push("/login");
};
