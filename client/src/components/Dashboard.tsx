import Header from './Header';
import React from 'react';
import styled from 'styled-components';
import Messanger from '../routes/Messanger';
import { Route, Routes } from 'react-router-dom';
import Profile from '../routes/Profile';
import Login from '../routes/Login';
import Registration from '../routes/Registration';
import PrivateRoute from '../hocs/PrivateRoute';
import NotFound from '../routes/NotFound';
import Friends from '../routes/Friends';

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
        <Route path="/" element={
          <PrivateRoute>
            <Messanger />
          </PrivateRoute>
          }
        />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
          }
        />
        <Route path="/friends" element={
          <PrivateRoute>
            <Friends />
          </PrivateRoute>
          }
        />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainContainer>
  )
}
export default Dashboard;
