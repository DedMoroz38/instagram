import Header from './Header';
import React from 'react';
import styled from 'styled-components';
import Messanger from '../routes/Messanger';
import { Route, Routes } from 'react-router-dom';
import ProfileContainer from '../routes/Profile/ProfileContainer';
import LoginContainer from '../routes/Login/LoginContainer';
import RegistrationContainer from '../routes/Registration/RegistrationContainer';
import PrivateRoute from '../hocs/PrivateRoute';
import NotFound from '../routes/NotFound';
import FriendsContainer from '../routes/Friends/FriendsContainer';
import MainContainer from '../routes/Main/MainContainer';

const Container = styled.div`
  display: flex; 
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
`;

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header />
      <Routes>
      <Route path="/" element={
          <PrivateRoute>
            <MainContainer />
          </PrivateRoute>
          }
        />
        <Route path="/messanger/*" element={
          <PrivateRoute>
            <Messanger />
          </PrivateRoute>
          }
        />
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfileContainer />
          </PrivateRoute>
          }
        />
        <Route path="/friends" element={
          <PrivateRoute>
            <FriendsContainer />
          </PrivateRoute>
          }
        />
        <Route path="/signin" element={<LoginContainer />} />
        <Route path="/signup" element={<RegistrationContainer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  )
}
export default Dashboard;
