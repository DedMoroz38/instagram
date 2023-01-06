import axios from 'axios';
import { useEffect, useState } from 'react';
import config from "../../config.json";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import ContactsPresentaional from './ContactsPresentaional';


export const ContactsContainer: React.FC = () => {
  const userConversations = useAppSelector((state) => state.userConversations);
  const userMessages = useAppSelector((state) => state.userMessages);
  
  const [matchedConversations, setMatchedConversations] = useState<Array<{
    user_id: number;
    conversation_id: number;
    full_name: string;
    photo: string | null;
  }>>([]);


  const findUsers = (event: any): void => {
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
  }, [userConversations])

  return (
    <ContactsPresentaional
      matchedConversations={matchedConversations}
      findUsers={findUsers}
      messages={userMessages.messages}
      calculateTime={calculateTime}
    />
  )
}
export default ContactsContainer;
