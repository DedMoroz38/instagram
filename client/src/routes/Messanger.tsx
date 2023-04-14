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
import PrivateMessageRoute from '../hocs/PrivateMessageRoute';
import { useWidthContext } from '../ContextProviders/WidthProivder';
import { useGetConversationsAndMessages } from '../hooks/fetchHooks/messanger/useGetConversationsAndMessages';


const MainContainer = styled.div`
  display: flex; 
  height: calc(100vh - 50px);
  @media (max-width: 420px){
    height: calc(100vh - 60px);
  }
`;

const Messanger: React.FC = () => {
  const {isMobile} = useWidthContext()
  const userConversations = useAppSelector((state) => state.userConversations);
  useGetConversationsAndMessages(userConversations);

  return (
    <MainContainer>
      <ContactsContainer />
      {!isMobile &&
        <Routes>
          <Route path="/:userId" element={<ConversationsContainer/>} />
          <Route path="/" element={<DefaultConversation />} />
        </Routes >
      }
    </MainContainer>
  )
}
export default Messanger;
