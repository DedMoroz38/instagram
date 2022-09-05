import Conversations from '../components/Conversations/ConversationsContainer';
import Contacts from '../components/Contacts';
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
      <Contacts />
      {/* <Conversations /> */}
      <Routes>
          <Route path="/:friend" element={<Conversations />} />
      </Routes >
    </MainContainer>
  )
}
export default Messanger;
