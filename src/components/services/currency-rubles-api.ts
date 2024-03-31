import axios, { AxiosInstance } from 'axios';

export const BACKEND_URL = 'https://www.cbr-xml-daily.ru/daily_json.js';
export const REQUEST_TIMEOUT = 5000;

export const createCurrencyRublesAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
}