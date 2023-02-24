import { NavLink } from "react-router-dom";
import styled from "styled-components";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { CSSProperties } from "react";

const MainContainer = styled(NavLink)`
  box-sizing: border-box;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0 10px;
  margin-bottom: 10px;
  border-radius: 15px;
  height: 70px;
  width: 100%;
  &:hover {
    background: #1a1e23;
  }
  position: relative;
`;

const PhotoContainer = styled.div`
  aspect-ratio: 1/1;
  padding: 3px;
  width: 50px;
  height: 50px;
  display: felx;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
`;

const ContactPhoto = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const ContactInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 10px;
  height: 40px;
  justify-content: space-between;
`

const ContactName = styled.p`
  color: ${({ theme }) => theme.color};
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 50%;
`;
const LastMessage = styled.p`
  font-size: 14px;
  color: #96989d;
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const TimeOfLastMessage = styled.p`
  color: #96989d;
  font-size: 14px;
  position: absolute;
  top: 15px;
  right: 15px;
`

interface ContactBox{
  conversation: {
    user_id: number;
    conversation_id: number;
    full_name: string;
    photo: string | null;
  },
  lastMessage: {
    message_id: number;
    conversation_id: number;
    message: string;
    created_at: string;
    sender_id: number;
  },
  timeOfLastMessage: string
}

const activeStyle: CSSProperties = {
  background: "red",
};

const ContactBox: React.FC<ContactBox> = ({conversation, lastMessage, timeOfLastMessage}) => {

  return (
    <MainContainer
      to={`${conversation.full_name}&${conversation.conversation_id}`}
      style={({ isActive }) => ({ color: isActive ? "green" : "blue" })}
    > 
      {
        conversation.photo === null ?
        <PhotoContainer>
          <PermIdentityIcon style={{height: '100%', color: "white", width: '100%'}}/>
        </PhotoContainer> : 
        <ContactPhoto
          src={`${process.env.REACT_APP_IMAGES_URL}users/${conversation.photo}`}
          alt="user photo"
        />
      }
      <ContactInfoContainer>
        <ContactName>{conversation.full_name}</ContactName>
        <LastMessage>{lastMessage?.message}</LastMessage>
      </ContactInfoContainer>
      <TimeOfLastMessage>{timeOfLastMessage}</TimeOfLastMessage>
    </MainContainer>
  )
}

export default ContactBox