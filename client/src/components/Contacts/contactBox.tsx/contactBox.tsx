import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CSSProperties } from "react";
import { IdentityIcon } from "../../StyledIcons";

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
    ${({theme}) => theme.contact.hoverBackground};
  }
  position: relative;
`;

const ContactPhoto = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const ContactInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  height: 40px;
`

const ContactName = styled.p`
  color: ${({ theme }) => theme.color};
  // overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 50%;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`

const LastMessage = styled.p`
  font-size: 14px;
  color: #96989d;
  width: 70%;
  white-space: nowrap;
  // overflow: hidden;
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
  refernce: any,
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

const ContactBox: React.FC<ContactBox> = ({refernce, conversation, lastMessage, timeOfLastMessage, emptyQuery}) => {

  return (
    <MainContainer
      ref={refernce}
      to={`${conversation.user_id}`}
      state={{ conversation }}
      onClick={() => emptyQuery()}
    > 
      {
        conversation.photo === null ?
        <IdentityIcon dimensions="50px"/>
         : 
        <ContactPhoto
          src={`${process.env.REACT_APP_IMAGES_URL}users/${conversation.photo}`}
          alt="user photo"
        />
      }
      <ContactInfoContainer>
        <InfoBox>
          <ContactName>{conversation.full_name}</ContactName>
          <LastMessage>{lastMessage?.message}</LastMessage>
        </InfoBox>
        <TimeOfLastMessage>{timeOfLastMessage}</TimeOfLastMessage>
      </ContactInfoContainer>
    </MainContainer>
  )
}

export default ContactBox