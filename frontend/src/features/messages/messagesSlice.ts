import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitialMsgSliceState, SingleChat, SingleChatUser, SingleMessage } from './types';

export const messagesSlice = createSlice({
  name: 'chat',
  initialState: {
    parcipient: {},
    messages: [{}],
    chats: undefined,
  } as InitialMsgSliceState,
  reducers: {
    setParcipient: (state, action) => {
      state.parcipient = action.payload.parcipient;
    },
    setMessages: (state, action) => {
      state.messages = action.payload.messages;
    },
    addNewMessage: (state, action) => {
      state.messages.push(action.payload.message);
    },
    setAllChats: (state, action) => {
      let newChats;
      if (state.chats) {
        newChats = [...action.payload, ...state.chats];
      }
      newChats = [...action.payload];
      state.chats = newChats;
    },
    addNewChat: (state, action: PayloadAction<SingleChat>) => {
      if (state.chats) {
        state.chats = [...state.chats, action.payload];
      }
    },
  },
});

export const { setParcipient, setMessages, addNewMessage, setAllChats, addNewChat } = messagesSlice.actions;
