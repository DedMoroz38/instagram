import { RefObject } from "react";
import { addMessage } from "../../features/messages/messagesSlice";
import socket from "../../socket";

interface Message {
  conversation_id: number,
  sender_id: number,
  message: string,
  created_at: string
}

export const sendMessage = (
  messagesInput: RefObject<HTMLInputElement>, 
  conversationId: number,
  userId: number,
  dispatch: any
): void => {
  const inputValue = messagesInput.current!.value.trim();
  if (inputValue != ""){
    const messageCreatedAt = new Date().toISOString();

    const message: Message = {
      conversation_id: conversationId,
      sender_id: userId,
      message: inputValue,
      created_at: messageCreatedAt
    }
    dispatch(addMessage(message));
    socket.emit('dm', message);

    messagesInput.current!.value = '';
    messagesInput.current!.focus();
  }
}

export default sendMessage;


