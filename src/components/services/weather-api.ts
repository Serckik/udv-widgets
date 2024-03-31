import axios, { AxiosInstance } from 'axios';

const token = ''
export const BACKEND_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${token}&units=metric`;
export const IMAGES_URL = ' https://openweathermap.org/img/wn/'
export const REQUEST_TIMEOUT = 5000;

export const createWeatherAPI = (): AxiosInstance => {
    const api = axios.create({
        baseURL: BACKEND_URL,
        timeout: REQUEST_TIMEOUT,
    });

    return api;
}