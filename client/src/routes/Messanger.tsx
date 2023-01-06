import ConversationsContainer from '../components/Conversations/ConversationsContainer';
import ContactsContainer from '../components/Contacts/ContactsContainer';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import config from "../config.json";
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addMessages } from '../features/messages/messagesSlice';
import { addConversations } from '../features/friends/conversationsSlice';
import DefaultConversation from '../components/Conversations/DefaultConversation';


const MainContainer = styled.div`
  display: flex; 
  height: calc(100vh - 50px);
`;

const Messanger: React.FC = () => {
  const userConversations = useAppSelector((state) => state.userConversations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(userConversations.conversations.length === 0){
      axios.get(`${config.serverUrl}messanger/getConversationsAndMessages`,
        { withCredentials: true }
      )
      .then(res => {
        dispatch(addConversations(res.data.conversations))
        dispatch(addMessages(res.data.messages))
      })
      .catch(err => {
        console.log(err);
      });
    }
  }, []);



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
