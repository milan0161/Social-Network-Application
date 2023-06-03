import { setAllChats } from '../messagesSlice';
import { apiSlice } from '../../../app/api/apiSlice';
import { AllChats, Chat, MessageReq, MessageRes } from '../types';

import { soket } from '../../../pages/ChatPage';

const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<MessageRes, MessageReq>({
      query: ({ content, id }) => ({
        url: `/message/api/v1/send/${id}`,
        method: 'POST',
        data: { content },
      }),
      invalidatesTags: ['Messages'],
    }),
    getChat: builder.query<Chat, string>({
      query: (id) => ({
        url: `/message/api/v1/chat/${id}`,
        method: 'GET',
      }),
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }) {
        try {
          await cacheDataLoaded;

          const state: any = getState();
          const room = state.auth.user.id.concat(arg);
          soket.on(`${room}`, (data) => {
            if (data.action === 'sent') {
              updateCachedData((draft) => {
                draft.chat.messages.push(data.message);
                console.log(draft.chat.messages);
              });
            }
          });
          await cacheEntryRemoved;
          soket.off(`${room}`);
        } catch (error) {}
      },

      providesTags: ['Messages'],
    }),
    getAllChats: builder.query<AllChats, void>({
      query: () => ({
        url: '/message/api/v1/get-all-chats',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const allChats = await queryFulfilled;
          dispatch(setAllChats(allChats.data.allChats));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useSendMessageMutation, useGetChatQuery, useGetAllChatsQuery } = messageApiSlice;
