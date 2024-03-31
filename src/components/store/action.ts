import { createAction } from "@reduxjs/toolkit";

export const redirectToRoute = createAction<string>('user/redirectToRoute');

export const setCurrencyData = createAction<{ [key: string]: CurrencyType }>('widget/currencyData');