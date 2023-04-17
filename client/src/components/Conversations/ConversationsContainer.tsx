import { useCallback, useEffect, useRef, useState } from 'react';
import ConverationPresentational from './ConversationPresentational';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useMessageLoad from '../../hooks/fetchHooks/messanger/useMessageLoad';
import { sendMessage } from '../../lib/messanger/sendMessage';
import FileLoadProvider from '../../ContextProviders/FileLoadProvider';
import { useCreateConversation } from '../../hooks/fetchHooks/messanger/useCreateConversation';
import { addConversation } from '../../features/friends/conversationsSlice';
import { useGetConversationsAndMessages } from '../../hooks/fetchHooks/messanger/useGetConversationsAndMessages';
import { useWidthContext } from '../../ContextProviders/WidthProivder';
import useSocketSetup from '../../hooks/useSocketSetup';

type LocationState = {
  state: {
    conversation: {
        user_id: number;
        conversation_id: number | null;
        full_name: string;
        photo: string | null;
    },
  }
}

const ConversationsContainer: React.FC<{}> = () => {
  useSocketSetup();
  const {isMobile} = useWidthContext()
  if(isMobile){
    const userConversations = useAppSelector((state) => state.userConversations);
    useGetConversationsAndMessages(userConversations);
  }
  // const userConversations = useAppSelector((state) => state.userConversations);
  // useGetConversationsAndMessages(userConversations);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location as LocationState;
  const conversation = state.conversation;
  const { userId } = useParams();
  const [recieverId, setRecieverId] = useState<number | null>(null);
  const [conversationId, setConverationId] = useState<number | null>(null);
  const senderId = useAppSelector(state => state.userInfo.id);
  
  const dispatch = useAppDispatch();
  const userMessages = useAppSelector((state) => state.userMessages);
  const user = useAppSelector((state) => state.userInfo);
  const messagesInput = useRef<HTMLInputElement>(null);
  const bottomDiv = useRef<HTMLDivElement>(null);
  const [messagesGroupNumber, setMessagesGroupNumber] = useState(0);
  const observer = useRef();
  const {
    loading,
    hasMore,
    prevMessages
  } = useMessageLoad(messagesGroupNumber, conversationId);
  const filteredPrevMessages = prevMessages.filter(msg => msg.conversation_id === conversationId)
  const filteredMessages = userMessages.messages.filter(msg => msg.conversation_id === conversationId);
  const [isOpenFileModel, setIsOpenFileModel] = useState<boolean>(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  // useSocketSetup();

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

  useEffect(() => {
    if(!conversation.conversation_id) return;
    setConverationId(conversation.conversation_id);
  }, [conversation.conversation_id]);

  useEffect(() => {
    setRecieverId(+userId);
  }, [userId]);

  const {isLoading, converationIdFromDb} = useCreateConversation(senderId, recieverId, conversation.conversation_id);

  useEffect(() => {
    if(!converationIdFromDb) return;
    setConverationId(converationIdFromDb);
  }, [converationIdFromDb])

  useEffect(() => {
    if(converationIdFromDb !== null){
      dispatch(addConversation({
        ...conversation,
        conversation_id: converationIdFromDb
      }));
    }
  }, [converationIdFromDb])

  const inputFocus = () => {
    messagesInput.current!.focus();
  }

  const send = () => sendMessage(messagesInput, conversationId, user.id, dispatch);
  
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

  useEffect(() => {
    bottomDiv.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [userMessages]);

  if(isLoading) {
    return <p>Loading...</p>;
  }

  const friendName = conversation.full_name;

  const goBack = () => {
    navigate('/messanger');
  }

  return (
    <FileLoadProvider>
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
        conversationId={conversationId}
        goBack={goBack}
      />
    </FileLoadProvider>
  )
}
export default ConversationsContainer;
