import Header from './Header';
import React from 'react';
import styled from 'styled-components';
import Messanger from './Messanger';
import { Route, Routes } from 'react-router-dom';
import Profile from './Profile';

const MainContainer = styled.div`
  display: flex; 
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
`;

const Dashboard: React.FC = () => {
  return (
    <MainContainer>
      <Header />
      <Routes>
        <Route path="/*" element={<Messanger />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </MainContainer>
  )
}
export default Dashboard;
