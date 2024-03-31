import { createReducer } from '@reduxjs/toolkit';
import { setCurrencyData } from './action';

type InitialState = {
  currencyData: { [key: string]: CurrencyType };
}

const initialState: InitialState = {
  currencyData: {},
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrencyData, (state, action) => {
      state.currencyData = action.payload;
    })
});