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

    // socket.on('messages', messages => {
    //   dispatch(addMessage(messages));
    // });

    socket.on('dm', message => {
      dispatch(addMessage({
        message: message.message,
        messagefrom: message.messagefrom,
        messageto: message.messageto
      }));
    });

    return () => {
      socket.off('connect_error');
      socket.off('messages');
    }
  }, []);
}

export default useSocketSetup;