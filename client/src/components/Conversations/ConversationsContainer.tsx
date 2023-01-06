import { useCallback, useEffect, useRef, useState } from 'react';
import ConverationPresentational from './ConversationPresentational';
import { useParams } from 'react-router-dom';
import useSocketSetup from '../../hooks/useSocketSetup';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import socket from '../../socket';
import axios from 'axios';
import config from "../../config.json";
import { addMessage, addMessages } from '../../features/messages/messagesSlice';
import useMessageLoad from '../../hooks/useMessageLoad';
import { sendMessage } from '../../lib/messanger/sendMessage';


const ConversationsContainer: React.FC<{}> = () => {
  const { friend } = useParams();
  const dispatch = useAppDispatch();
  const userMessages = useAppSelector((state) => state.userMessages);
  const user = useAppSelector((state) => state.userInfo);
  const messagesInput = useRef<HTMLInputElement>(null);
  const bottomDiv = useRef<HTMLDivElement>(null);
  const [messagesGroupNumber, setMessagesGroupNumber] = useState(0);
  const [friendName, conversationId] = friend!.split('&');
  const conversation_id = +conversationId;
  const observer = useRef<HTMLDivElement>(null!);
  const {
    loading,
    hasMore,
    prevMessages
  } = useMessageLoad(messagesGroupNumber, conversation_id);
  const filteredPrevMessages = prevMessages.filter(msg => msg.conversation_id === conversation_id)
  const filteredMessages = userMessages.messages.filter(msg => msg.conversation_id === conversation_id);
  const [isOpenFileModel, setIsOpenFileModel] = useState<boolean>(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [percentCompleted, setPercentCompleted] = useState(0);
  useSocketSetup();


  const lastMessageRef = useCallback((node: any) => {
    if(loading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        setMessagesGroupNumber(prevMessagesGroupNumber => prevMessagesGroupNumber + 1);
      } 
    })
    if(node) observer.current.observe(node);
  }, [loading, hasMore]);

  const inputFocus = () => {
    messagesInput.current!.focus();
  }

  const send = () => sendMessage(messagesInput, conversation_id, user.id, dispatch);
  
  const handleKeypress = (e: { key: string; }): void => {
    if (e.key === "Enter") {
      send();
    }
  }
  const handleBlur = (): void => {
    // inputFocus();
  }

  const attachFiles = (event: any): void => {
    const files = event.target.files;
    setAttachedFiles(files);
    setIsOpenFileModel(true);
  }

  const sendMessageWithFiles = () => {
    const attachedFilesData = new FormData();

    Object.keys(attachedFiles).forEach(key => {
      const item = attachedFiles.item(key);
      attachedFilesData.append(item.name, item);
    });

    const config = {
      onUploadProgress: (progressEvent: {loaded: number, total: number}) => {
        const loaded = progressEvent.loaded;
        const total = progressEvent.total;
        setPercentCompleted(Math.floor((loaded / total) * 100));
      },
      withCredentials: true
    }

    axios.post(`${process.env.REACT_APP_SERVER_URL}messanger/sendFiles`,
      attachedFilesData,
      config
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }



  useEffect(() => {
    bottomDiv.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [userMessages]);


  return (
    <ConverationPresentational 
      friendName={friendName}
      filteredMessages={filteredMessages}
      handleBlur={handleBlur}
      messagesInput={messagesInput}
      handleKeypress={handleKeypress}
      send={send}
      bottomDiv={bottomDiv}
      userId={user.id}
      lastMessageRef={lastMessageRef}
      filteredPrevMessages={filteredPrevMessages}
      loading={loading}
      attachFiles={attachFiles}
      isOpenFileModel={isOpenFileModel}
      attachedFiles={attachedFiles}
      setIsOpenFileModel={setIsOpenFileModel}
      setAttachedFiles={setAttachedFiles}
      conversationId={conversation_id}
      sendMessageWithFiles={sendMessageWithFiles}
      percentCompleted={percentCompleted}
    />
  )
}
export default ConversationsContainer;
