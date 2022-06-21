import Conversations from './Conversations';
import Contacts from './Contacts';
import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex; 
  height: calc(100vh - 50px);
`;

const Messanger: React.FC = () => {
  return (
    <MainContainer>
      <Contacts />
      <Conversations />
    </MainContainer>
  )
}
export default Messanger;
