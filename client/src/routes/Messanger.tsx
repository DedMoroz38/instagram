import ConversationsContainer from '../components/Conversations/ConversationsContainer';
import ContactsContainer from '../components/Contacts/ContactsContainer';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import config from "../config.json";
import { useAppDispatch } from '../app/hooks';
import { addMessages } from '../features/messages/messagesSlice';
import { addConversations } from '../features/friends/conversationsSlice';


const MainContainer = styled.div`
  display: flex; 
  height: calc(100vh - 50px);
`;

const Messanger: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.get(`${config.serverUrl}messages/getConversationsAndMessages`,
      { withCredentials: true }
    )
    .then(res => {
      console.log(res);
      dispatch(addConversations(res.data.conversations))
      dispatch(addMessages(res.data.messages))
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <MainContainer>
      <ContactsContainer />
      <Routes>
        <Route path="/:friend" element={<ConversationsContainer />} />
      </Routes >
    </MainContainer>
  )
}
export default Messanger;
