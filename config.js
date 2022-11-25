import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

/*
APP_NAME: "NODE-REACT-AWS",
    API: "http://localhost:8080/api",
    PRODUCTION: false,
    DOMAIN: "http://localhost:3000",
    FB_APP_ID: "FILLMEINLATER"
 */

export const API = publicRuntimeConfig.API;
export const APP_NAME = publicRuntimeConfig.APP_NAME;
export const PRODUCTION = publicRuntimeConfig.PRODUCTION;
export const DOMAIN = publicRuntimeConfig.DOMAIN;
export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID

