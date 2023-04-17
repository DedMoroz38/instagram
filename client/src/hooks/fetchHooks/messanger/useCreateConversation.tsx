import axios from "axios";
import { useEffect, useState } from "react"
import { useErrorPopUpContext } from "../../../ContextProviders/ClienErrorHandlingProvider";
import { Errors } from "../../../lib/errors/Errors";

export const useCreateConversation = (
  senderId: number,
  recieverId: number | null,
  conversation_id: number | undefined
  ): {isLoading: boolean, converationIdFromDb: number | null} => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [converationIdFromDb, setConversationId] = useState<number | null>(null);
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();

  useEffect(() => {
    if (recieverId !== null && !conversation_id){
      setIsLoading(true);
      axios.get(`messanger/createConversation/${senderId}/${recieverId}`, 
        {withCredentials: true},
      )
      .then(res => {
        setConversationId(res.data.converationId);
      })
      .catch(err => {
        setErrorMessage(Errors.default);
        setErrorPopUpIsOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
    }
  }, [recieverId])
  

  return {isLoading, converationIdFromDb}
}

