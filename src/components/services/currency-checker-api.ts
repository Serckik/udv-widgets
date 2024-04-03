import axios, { AxiosInstance } from 'axios';

const token = ""
export const BACKEND_URL = `https://v6.exchangerate-api.com/v6/${token}`;
export const REQUEST_TIMEOUT = 5000;

export const currencyCheckerAPI = (): AxiosInstance => {
    const api = axios.create({
        baseURL: BACKEND_URL,
        timeout: REQUEST_TIMEOUT,
    });

    return api;
}