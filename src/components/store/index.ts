import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createCurrencyRublesAPI } from '../services/currency-rubles-api';
import { redirect } from './middlewares/redirect';
import { currencyCheckerAPI } from '../services/currency-checker-api';
import { createWeatherAPI } from '../services/weather-api';

export const currencyRublesApi = createCurrencyRublesAPI();
export const currencyCheckerApi = currencyCheckerAPI()
export const weatherApi = createWeatherAPI()

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(redirect),
});

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

