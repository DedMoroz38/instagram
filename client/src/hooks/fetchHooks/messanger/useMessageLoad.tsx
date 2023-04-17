import { useEffect, useState } from "react";
import axios from "axios";
import { useErrorPopUpContext } from "../../../ContextProviders/ClienErrorHandlingProvider";
import { Errors } from "../../../lib/errors/Errors";
const useMessageLoad = (messagesGroupNumber: number, conversationId: number) => {
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [prevMessages, setPrevMessages] = useState<Array<{
                                                          message_id: number,
                                                          conversation_id: number,
                                                          message: string,
                                                          created_at: string,
                                                          sender_id: number
                                                        }>>([]);

  useEffect(() => {
    if(!(messagesGroupNumber === 0)) {
      setLoading(true);
      axios.get(`messanger/getPastMessages/${messagesGroupNumber}/${conversationId}`,
        { withCredentials: true }
      ).then(res => {
        setLoading(false);
        const messages = res.data.messages;
        setPrevMessages(prevMessages => {
          return [...prevMessages, ...messages]
        })
        if(messages.length < 20){
          setHasMore(false);
        }
      }).catch(err => {
        setErrorMessage(Errors.default);
        setErrorPopUpIsOpen(true);
      });
    }
  },[messagesGroupNumber, conversationId]);

  return { loading, hasMore, prevMessages }
}

export default useMessageLoad;