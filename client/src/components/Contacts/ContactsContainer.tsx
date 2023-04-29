import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useGetUsers } from '../../hooks/fetchHooks/users/useGetUsers';
import ContactsPresentaional from './ContactsPresentaional';
import useSocketSetup from '../../hooks/useSocketSetup';


export const ContactsContainer: React.FC = () => {
  useSocketSetup();

  const [matchedConversations, setMatchedConversations] = useState<Array<{
    user_id: number;
    conversation_id: number;
    full_name: string;
    photo: string | null;
  } | {
    id: number,
    full_name: string,
    user_name: string,
    photo: string
  }>>([]);

  const userConversations = useAppSelector((state) => state.userConversations);
  const userMessages = useAppSelector((state) => state.userMessages);
  const [query, setQuery] = useState<string>('');
  const [usersGroupNumber, setUsersGroupNumber] = useState(0);
  const [foundUsers, setFoundUsers] = useState<Array<{
    id: number,
    user_name: string,
    full_name: string,
    photo: string | null
  }>>([]);
  const {loading, hasMore, data} = useGetUsers(
    query,
    usersGroupNumber,
    setUsersGroupNumber,
    false,
    matchedConversations.length === 0
  );
  
  const observer = useRef();
  const inputRef = useRef(null);

  const lastUserRef = useCallback((node: any) => {
    if(loading) return;
    if(observer.current) observer.current?.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        setUsersGroupNumber(prevUsersGroupNumber => prevUsersGroupNumber + 1);
      } 
    })
    if(node) observer.current.observe(node);
  }, [loading, hasMore]);

  const findUsers = (event: any): void => {
    setQuery(event.target.value);
    const correctRegex = new RegExp(event.target.value, 'i');
    const filteredUsers = userConversations.conversations.filter((conversation) => correctRegex.test(conversation.full_name));
    setMatchedConversations(filteredUsers);
  }

  const calculateTime = (created_at: string): string => {
    const today = new Date();
    const messageCreatedAt = new Date(created_at);

    if (today.toDateString() === messageCreatedAt.toDateString()) {
      return messageCreatedAt.toLocaleTimeString().slice(0, 5);
    } else {
      return messageCreatedAt.toLocaleDateString();
    }
  }

  useEffect(() => {
    setMatchedConversations(userConversations.conversations);
  }, [userConversations]);

  useEffect(() => {
    if(!data) return;
    const {users} = data;
    setFoundUsers((prevUsers) => [ ...prevUsers, ...users]);
  }, [data]);

  useEffect(() => {
    setFoundUsers([]);
  }, [query]);

  useEffect(() => {
    if(!data) return;
    setMatchedConversations(prevUsers => [...prevUsers, ...foundUsers]);
  }, [foundUsers]);

  const emptyQuery = () => {
    inputRef.current.value = '';
  }

  return (
    <ContactsPresentaional
      inputRef={inputRef}
      emptyQuery={emptyQuery}
      lastUserRef={lastUserRef}
      matchedConversations={matchedConversations}
      findUsers={findUsers}
      messages={userMessages.messages}
      calculateTime={calculateTime}
    />
  )
}
export default ContactsContainer;
