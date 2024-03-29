import { createAction } from "@reduxjs/toolkit";
import { MessageData, UserData } from "../../types";

export const redirectToRoute = createAction<string>('user/redirectToRoute');

export const setUser = createAction<UserData>('user/setUser');

export const setCurrentChat = createAction<MessageData[]>('chat/setCurrentChat');