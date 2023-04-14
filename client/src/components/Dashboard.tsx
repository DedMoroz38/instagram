import Header from './Header';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Messanger from '../routes/Messanger';
import { Link, Route, Routes } from 'react-router-dom';
import ProfileContainer from '../routes/Profile/ProfileContainer';
import LoginContainer from '../routes/Login/LoginContainer';
import RegistrationContainer from '../routes/Registration/RegistrationContainer';
import PrivateRoute from '../hocs/PrivateRoute';
import NotFound from '../routes/NotFound';
import FriendsContainer from '../routes/Friends/FriendsContainer';
import MainContainer from '../routes/Main/MainContainer';
import ErrorPopUp from './ErrorPopUp';
import EmailConfirmation from '../routes/EmailConfirmation';
import PasswordResetRequest from '../routes/PasswordResetRequest';
import PasswordReset from '../routes/PasswordReset';
import Toggle from './Toggler';
import ConversationsContainer from './Conversations/ConversationsContainer';
import { useWidthContext } from '../ContextProviders/WidthProivder';
import useSocketSetup from '../hooks/useSocketSetup';
import Account from '../routes/Account/Account';

const Container = styled.div`
  display: flex; 
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  @media (max-width: 420px) {
    flex-direction: column-reverse;
  }

`;

const ModileBar = styled.div`
  height: 60px;
  transition: all 0.3s linear;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 20px;
  position: fixed;
  top: 0;
  width: 100vw;
  background: ${({ theme }) => theme.main.background};
`;
const Heading = styled(Link)`
  color: ${({theme}) => theme.header.linkColor};
  font-family: 'Fasthand', cursive;
  font-weight: 100;
  text-decoration: none;
  font-size: 30px;
`;



export const ModalContext = React.createContext<any>(null);

const Dashboard: React.FC = () => {
  const {isMobile} = useWidthContext()

  return (
    <Container>
      <ErrorPopUp/> 
      <Header />
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <MainContainer />
          </PrivateRoute>
          }
        />
        <Route path="/:userId" element={
          <PrivateRoute>
            <Account />
          </PrivateRoute>
          }
        />
        <Route path="/messanger/*" element={
          <PrivateRoute>
            <Messanger/>
          </PrivateRoute>
          }
        />
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfileContainer />
          </PrivateRoute>
          }
        />
        <Route path="/signin" element={<LoginContainer />} />
        <Route path="/signup" element={<RegistrationContainer />} />
        <Route path="/emailconfirmation" element={<EmailConfirmation />} />
        <Route path="/passwordreset" element={<PasswordResetRequest />} />
        <Route path="/createnewpassword" element={<PasswordReset />} />

        {
          isMobile && 
          <Route path="/messanger/:userId" element={
            <PrivateRoute>
              <ConversationsContainer />
            </PrivateRoute>
            }
          />
        }
        <Route path="*" element={<NotFound />} />
      </Routes>
      {
        isMobile && 
        <ModileBar>
          <Heading
            to="/"
          >Pintogram</Heading>
          <Toggle />
        </ModileBar>
      }
    </Container>
  ) 
}
export default Dashboard;
