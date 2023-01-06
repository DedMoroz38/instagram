import React from 'react'
import styled from 'styled-components';
import messangerIcon from '../../otherFiles/messangerIcon.svg';

const MainContainer = styled.div`
  flex-grow: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const IconContainer = styled.div`
  width: 100px;
  height: 100px;
  border: 2px solid ${({theme}) => theme.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.img`
  width: 50px;
  height: 50px;
  filter: ${({theme}) => theme.filter};
`;

const Heading = styled.h1`
  color: ${({theme}) => theme.color};
  margin: 10px 0;
  font-size: 22px;
  font-weight: 300;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;
const SubHeading = styled.p`
  color: #96989d;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-weight: 300;
  font-size: 14px;
`;


const DefaultConversation = () =>  {
  return (
    <MainContainer>
      <IconContainer>
        <Icon src={messangerIcon} alt="chat gif" />
      </IconContainer>
      <Heading>Your Messages</Heading>
      <SubHeading>Send private photos and messages to a friend</SubHeading>
    </MainContainer>
  )
}

export default DefaultConversation;
