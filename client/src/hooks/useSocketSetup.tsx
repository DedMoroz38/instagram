import axios from "axios";
import fileDownload from "js-file-download";
import {  useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useErrorPopUpContext } from "../ContextProviders/ClienErrorHandlingProvider";
import { addConversation } from "../features/friends/conversationsSlice";
import { addMessage } from "../features/messages/messagesSlice";
import { Errors } from "../lib/errors/Errors";
import { useCreateOrGetConversation } from "../lib/messanger/useCreateOrGetConversation";
import socket from "../socket";

const useSocketSetup = () => {
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();
  const dispatch = useAppDispatch();
  const conversations = useAppSelector(state => 
    state.userConversations.conversations
  )
  const userId = useAppSelector(state => state.userInfo.id);

  useEffect(() => {
    socket.connect();
    socket.on('connect_error', () => {
      // alert('Error in socket connection!!!')
    });


    socket.on('dm', message => {
      useCreateOrGetConversation(
        message.conversation_id,
        dispatch,
        conversations,
        userId
      );
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
        useCreateOrGetConversation(
          +messageData.conversation_id,
          dispatch,
          conversations,
          userId
        );
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
        setErrorMessage(Errors.default);
        setErrorPopUpIsOpen(true);
      });
    })

    return () => {
      socket.off('connect_error');
      socket.off('dm');
      socket.off('fm');
    }
  }, [conversations]);
}

export default useSocketSetup;


