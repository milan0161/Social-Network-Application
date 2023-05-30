import { useAppDispatch } from '../../../app/hooks';
import { setAllChats } from '../messagesSlice';
import { apiSlice } from '../../../app/api/apiSlice';
import { AllChats, Chat, MessageReq, MessageRes, SingleChat } from '../types';
import openSocket from 'socket.io-client';

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
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const soket = openSocket('http://localhost:7000');
        try {
          await cacheDataLoaded;
          soket.on('messages', (data) => {
            if (data.action === 'sent') {
              updateCachedData((draft) => {
                draft.chat.messages.push(data.message);
              });
            }
          });
          await cacheEntryRemoved;
          soket.off('messages');
        } catch (error) {}
      },

      // providesTags: ['Messages'],
    }),
    getAllChats: builder.query<AllChats, void>({
      query: () => ({
        url: '/message/api/v1/get-all-chats',
      }),
      // transformResponse: (response: { allChats: SingleChat[] }, meta, arg): AllChats | Promise<AllChats> => {
      //   if (response) {
      //     dispatch(setAllChats({ allChats: response.allChats }));
      //   }
      //   return response;
      // },
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
