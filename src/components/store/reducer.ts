import { createReducer } from '@reduxjs/toolkit';
import { setCurrentChat, setUser } from './action';
import { MessageData } from '../../types';

type InitialState = {
  userData: {
    name: string;
    currentRoom: string;
  }
  currentChat: MessageData[];
}

const initialState: InitialState = {
  userData: {
    name: '',
    currentRoom: '',
  },
  currentChat: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setCurrentChat, (state, action) => {
      state.currentChat = action.payload;
    })
});