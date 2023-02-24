import ConversationsContainer from '../components/Conversations/ConversationsContainer';
import ContactsContainer from '../components/Contacts/ContactsContainer';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import config from "../config.json";
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addMessages, MessagesState } from '../features/messages/messagesSlice';
import { addConversations } from '../features/friends/conversationsSlice';
import DefaultConversation from '../components/Conversations/DefaultConversation';


const MainContainer = styled.div`
  display: flex; 
  height: calc(100vh - 50px);
`;

const Messanger: React.FC = () => {
  const userConversations = useAppSelector((state) => state.userConversations);
  const dispatch = useAppDispatch();
  const [messagesFromDB, setMessagesFromDB] = useState<Array<{
    message_type: 'text' | 'file'
    message_id: number,
    conversation_id: number,
    message: string,
    created_at: string,
    sender_id: number
  }>>([]);
  const [attachments, setAttachments] = useState<Array<{
    attachment_id: number,
    file_name: string,
    size: number,
    message_id: number
  }>>([]);

  useEffect(() => {
    if(userConversations.conversations.length === 0){
      axios.get(`${config.serverUrl}messanger/getConversationsAndMessages`,
        { withCredentials: true }
      )
      .then(res => {
        dispatch(addConversations(res.data.conversations));
        setAttachments(res.data.messageAttachments)
        setMessagesFromDB(res.data.messages)
      })
      .catch(err => {
        console.log(err);
      });
    }
  }, []);

  useEffect(() => {
    if(setMessagesFromDB.length > 0){
      const result: MessagesState = [];
      messagesFromDB.forEach(message => {
        if(message.message_type === 'file'){
          const belongingAttachments = attachments
            .filter(attachment => attachment.message_id === message.message_id)
          result.push({
            ...message, 
            attachments: [
              ...belongingAttachments
            ]
          })
        } else {
          result.push(message);
        }
      })
      dispatch(addMessages(result));
    }
  }, [messagesFromDB]);



  return (
    <MainContainer>
      <ContactsContainer />
      <Routes>
        <Route path="/:friend" element={<ConversationsContainer />} />
        <Route path="/" element={<DefaultConversation />} />
      </Routes >
    </MainContainer>
  )
}
export default Messanger;
