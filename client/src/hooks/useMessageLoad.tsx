import { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addPrevMessages } from "../features/messages/messagesSlice";


const useMessageLoad = (messagesGroupNumber: number, conversationId: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [prevMessages, setPrevMessages] = useState<Array<{
                                                          id: number,
                                                          conversation_id: number,
                                                          message: string,
                                                          created_at: string,
                                                          sender_id: number
                                                        }>>([]);

  useEffect(() => {
    if(!(messagesGroupNumber === 0)) {
      setLoading(true);
      axios.get(`${process.env.REACT_APP_SERVER_URL}messanger/getPastMessages/${messagesGroupNumber}/${conversationId}`,
        { withCredentials: true }
      ).then(res => {
        setLoading(false);
        const messages = res.data.messages;
        if(messages.length > 0){
          setPrevMessages(prevMessages => {
            return [...prevMessages, ...messages]
          })
        } else {
          setHasMore(false);
        }
      }).catch(err => {
        console.log(err);
      });
    }
  },[messagesGroupNumber, conversationId]);

  return { loading, hasMore, prevMessages }
}

export default useMessageLoad;