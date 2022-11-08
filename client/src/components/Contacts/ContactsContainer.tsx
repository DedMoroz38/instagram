import axios from 'axios';
import { useEffect, useState } from 'react';
import config from "../../config.json";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import ContactsPresentaional from './ContactsPresentaional';


export const ContactsContainer: React.FC = () => {
  const userConversations = useAppSelector((state) => state.userConversations);
  
  const [matchedConversations, setMatchedConversations] = useState<Array<{
    user_id: number;
    conversation_id: number;
    full_name: string;
  }>>([]);


  const findUsers = (event: any): void => {
    const correctRegex = new RegExp(event.target.value, 'i');
    const filteredUsers = userConversations.conversations.filter((conversation) => correctRegex.test(conversation.full_name));
    setMatchedConversations(filteredUsers);
  }

  useEffect(() => {
    setMatchedConversations(userConversations.conversations);
  }, [userConversations])

  return (
    <ContactsPresentaional
      matchedConversations={matchedConversations}
      findUsers={findUsers}
    />
  )
}
export default ContactsContainer;
