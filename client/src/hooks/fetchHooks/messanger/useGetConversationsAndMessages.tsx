import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { useErrorPopUpContext } from "../../../ContextProviders/ClienErrorHandlingProvider";
import { addConversations, FriendsState } from "../../../features/friends/conversationsSlice";
import { addMessages, MessagesState } from "../../../features/messages/messagesSlice";
import { Errors } from "../../../lib/errors/Errors";

export const useGetConversationsAndMessages = (
  userConversations: FriendsState
  ) => {
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();
  const dispatch = useAppDispatch();
  const [messagesFromDB, setMessagesFromDB] = useState<Array<{
    message_type: 'text' | 'file'
    message_id: number,
    conversation_id: number,
    message: string,
    created_at: string,
    sender_id: number
  }>>([]);
  const [attachments, setAttachments] = useState<Array<{
    attachment_id: number,
    file_name: string,
    size: number,
    message_id: number
  }>>([]);

  useEffect(() => {
    if(userConversations.conversations.length === 0){
      axios.get(`${process.env.REACT_APP_SERVER_URL}messanger/getConversationsAndMessages`,
        { withCredentials: true }
      )
      .then(res => {
        dispatch(addConversations(res.data.conversations));
        setAttachments(res.data.messageAttachments)
        setMessagesFromDB(res.data.messages)
      })
      .catch(err => {
        setErrorMessage(Errors.default);
        setErrorPopUpIsOpen(true);
      });
    }
  }, []);

  useEffect(() => {
    if(messagesFromDB.length > 0){
      const result: MessagesState = [];
      messagesFromDB.forEach(message => {
        if(message.message_type === 'file'){
          const belongingAttachments = attachments
            .filter(attachment => attachment.message_id === message.message_id)
          result.push({
            ...message, 
            attachments: [
            ...belongingAttachments
            ]
          })
        } else {
          result.push(message);
        }
      })
      dispatch(addMessages(result));
    }
  }, [messagesFromDB]);

}

