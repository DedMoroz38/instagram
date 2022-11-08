import { useEffect, useRef } from 'react';
import ConverationPresentational from './ConversationPresentational';
import { useParams } from 'react-router-dom';
import useSocketSetup from '../../hooks/useSocketSetup';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import socket from '../../socket';
import axios from 'axios';
import config from "../../config.json";
import { addMessage, addMessages } from '../../features/messages/messagesSlice';

const ConversationsContainer: React.FC<{}> = () => {
  const { friend } = useParams();
  const dispatch = useAppDispatch();
  const userMessages = useAppSelector((state) => state.userMessages);
  const user = useAppSelector((state) => state.userInfo);
  const messagesInput = useRef<HTMLInputElement>(null);
  const bottomDiv = useRef<HTMLDivElement>(null);

  const [friendName, friendId] = friend!.split('.');

  useSocketSetup();

  const sendMessage = (): void => {
    const inputValue = messagesInput.current!.value;
    if (inputValue != ""){
      const messageCreatedAt = Date.now();

      dispatch(addMessage({
        message: inputValue,
        message_from: user.id,
        message_to: friendId,
        created_at: messageCreatedAt
      }));

      const message = {
        message_to: friendId,
        message: inputValue,
        created_at: messageCreatedAt
      }
      socket.emit('dm', message);

      messagesInput.current!.value = '';
      inputFocus();
    }
  }
  
  
  const handleKeypress = (e: { key: string; }): void => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }
  const handleBlur = (): void => {
    inputFocus();
  }
  const inputFocus = () => {
    messagesInput.current!.focus();
  }

  // useEffect(() => {
  //   axios.get(`${config.serverUrl}messages/getMessages`,
  //     { withCredentials: true }
  //   )
  //   .then(res => {
  //     dispatch(addMessages(res.data.messages));
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // }, []); 

  
  

  useEffect(() => {
    bottomDiv.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [userMessages]);

  return (
    <ConverationPresentational 
      friendName={friendName}
      friendId={friendId}
      messages={userMessages.messages}
      handleBlur={handleBlur}
      messagesInput={messagesInput}
      handleKeypress={handleKeypress}
      sendMessage={sendMessage}
      bottomDiv={bottomDiv}
    />
  )
}
export default ConversationsContainer;
