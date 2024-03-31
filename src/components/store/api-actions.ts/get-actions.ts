import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, State, currencyCheckerApi, currencyRublesApi, weatherApi } from "..";
import { setCurrencyData } from "../action";

export const getCurrencyRubles = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
}>(
    'widget/get-currency',
    async (_arg, { dispatch }) => {
        try {
            const { data } = await currencyRublesApi.get<CurrencyRublesType>('');
            const currencies = data.Valute
            dispatch(setCurrencyData(currencies))
        } catch (error) {
            console.error("Failed to fetch currency rubles:", error);
        }
    },
);

export const getCurrencyChecker = createAsyncThunk<CurrencyChecker, { base_currency: string, second_currency: string }, {
    dispatch: AppDispatch;
    state: State;
}>(
    'widget/get-currency-checker',
    async (param) => {
        try {
            const { data } = await currencyCheckerApi.get<CurrencyChecker>(`/pair/${param.base_currency}/${param.second_currency}`);
            return data;
        } catch (error) {
            console.error("Failed to fetch currency checker:", error);
            throw error;
        }
    },
);

export const getTodayCurrency = createAsyncThunk<number, { base_currency: string, second_currency: string }, {
    dispatch: AppDispatch;
    state: State;
}>(
    'widget/get-today-currency',
    async (param) => {
        try {
            const today = new Date();
            const dateString = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
            const { data } = await currencyCheckerApi.get<CurrencyHistory>(`/history/${param.base_currency}/${dateString}`);
            return data.conversion_rates[param.second_currency];
        } catch (error) {
            console.error("Failed to fetch today's currency:", error);
            throw error;
        }
    },
);

export const getWeatherByCityId = createAsyncThunk<WeatherType, number, {
    dispatch: AppDispatch;
    state: State;
}>(
    'widget/get-weather-by-city-id',
    async (id) => {
        try {
            const { data } = await weatherApi.get<WeatherApiType>('', { params: { id } });
            return {
                feels_like: data.main.feels_like,
                temp: data.main.temp,
                icon: data.weather[0].icon
            };
        } catch (error) {
            console.error("Failed to fetch weather by city id:", error);
            throw error;
        }
    },
);