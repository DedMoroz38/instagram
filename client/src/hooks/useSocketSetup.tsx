import {  useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { addMessage } from "../features/messages/messagesSlice";
import socket from "../socket";

const useSocketSetup = () => {
    
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.connect();
    socket.on('connect_error', () => {
      alert('Error in socket connection!!!')
    });

    socket.on('dm', message => {
      dispatch(addMessage({
        conversation_id: message.conversation_id,
        sender_id: message.sender_id,
        message: message.message,
        created_at: message.created_at
      }));
    });

    return () => {
      socket.off('connect_error');
      socket.off('dm');
    }
  }, []);
}

export default useSocketSetup;