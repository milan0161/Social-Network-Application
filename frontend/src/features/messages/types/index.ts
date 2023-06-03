export interface MessageReq {
  content: string;
  id: string;
}

export interface MessageRes {
  message: {
    id: string;
    cretedAt: Date;
    content: string;
    senderId: string;
    recivierId: string;
  };
}

export interface SingleChatUser {
  id: string;
  firstname: string;
  lastname: string;
  mainImage: string;
}

export interface SingleChat {
  users: SingleChatUser[];
}
export interface AllChats {
  allChats: SingleChat[];
}

export interface Chat {
  chat: Messages;
}
interface Messages {
  id: string;
  messages: SingleMessage[];
}

export interface SingleMessage {
  id: string;
  sender: Sender;
  content: string;
}

interface Sender {
  id: string;
  firstname: string;
  lastname: string;
  mainImage?: string;
}

export interface InitialMsgSliceState {
  parcipient: SingleChatUser;
  messages: SingleMessage[];
  chats?: SingleChat[];
}
