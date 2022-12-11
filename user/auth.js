import cookie from "js-cookie";
import Router from "next/router";

export const setCookie = (key, value) => {
  cookie.set(key, value, {
      expires: 1
  });
};

export const removeCookie = (key) => {
  cookie.remove(key);
};

export const getCookie = (key) => {
  return cookie.get(key);
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

const TOKEN = "token";
const USER = "user";

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
