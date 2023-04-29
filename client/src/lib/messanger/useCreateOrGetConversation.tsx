import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useErrorPopUpContext } from "../../ContextProviders/ClienErrorHandlingProvider";
import { addConversation } from "../../features/friends/conversationsSlice";
import { Errors } from "../errors/Errors";

export const createOrGetConversation = (
    conversationId: number,
    dispatch: any,
    conversations: any,
    userId: any
  ) => {
  // const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();
  const conversation = conversations.filter(conv => conv.conversation_id === conversationId);
  if(conversation.length === 0){
    axios.get(`messanger/getConversation/${conversationId}/${userId}`, 
      {withCredentials: true},
    )
    .then(res => {
      const conversation = res.data.conversation;
      dispatch(addConversation({
        ...conversation
      }))
    })
    .catch(err => {
      // setErrorMessage(Errors.default);
      // setErrorPopUpIsOpen(true);
    })
    .finally(() => {
    })
  }
}