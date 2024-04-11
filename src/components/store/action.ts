import { createAction } from "@reduxjs/toolkit";
import { CurrencyRublesTypes } from "../../types/currencyRubles";

export const redirectToRoute = createAction<string>('user/redirectToRoute');

export const setCurrencyData = createAction<{ [key: string]: CurrencyRublesTypes.CurrencyType }>('widget/currencyData');