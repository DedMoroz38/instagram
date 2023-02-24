import axios from "axios";
import fileDownload from "js-file-download";
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
        type: 'text',
        conversation_id: message.conversation_id,
        sender_id: message.sender_id,
        message: message.message,
        created_at: message.created_at
      }));
    });

    socket.on('fm', messageId => {
      axios.get(`messanger/getFileNames/${messageId}`,
        { 
          withCredentials: true,
        }
      )
      .then(res => {
        const {files, messageData} = res.data;
        
        dispatch(addMessage({
          message_type: 'file',
          message_id: messageId,
          conversation_id: +messageData.conversation_id,
          created_at: messageData.created_at,
          sender_id: messageData.sender_id,
          message: messageData.message,
          attachments: [...files]
        }))
      })
      .catch(err => {
        console.log(err);
      });
    })

    return () => {
      socket.off('connect_error');
      socket.off('dm');
    }
  }, []);
}

export default useSocketSetup;