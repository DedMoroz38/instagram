import ConversationsContainer from '../components/Conversations/ConversationsContainer';
import ContactsContainer from '../components/Contacts/ContactsContainer';
import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex; 
  height: calc(100vh - 50px);
`;

const Messanger: React.FC = () => {
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
