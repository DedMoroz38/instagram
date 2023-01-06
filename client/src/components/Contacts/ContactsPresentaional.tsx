import { NavLink } from "react-router-dom";
import styled from "styled-components";
import config from "../../config.json";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const MainContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
  list-style-type: none;
  flex-grow: 1;
  box-sizing: border-box;
  padding: 0 15px 11px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const FindContactsContainer = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 10px;
`

const FindContactsInput = styled.input`
  background: #16171b;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: none;
  font-size: 15px;
  color: ${({ theme }) => theme.color};
  transition: all 0.3s linear; 
  height: 58px;
  border-radius: 16px;
  padding-left: 10px;
  &::placeholder {
    padding-left: 5px;
  }
`

const ContactBox = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0 10px;
  margin-bottom: 10px;
  border-radius: 15px;
  height: 70px;
  &:hover {
    background: #1a1e23;
  }
  position: relative;
`;

const PhotoContainer = styled.div`
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
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 10px;
  height: 40px;
  justify-content: space-between;
`

const ContactName = styled.p`
  color: ${({ theme }) => theme.color}
`;
const LastMessage = styled.p`
  font-size: 14px;
  color: #96989d;
`
const TimeOfLastMessage = styled.p`
  color: #96989d;
  font-size: 14px;
  position: absolute;
  top: 15px;
  right: 15px;
`

interface Contacts{
  matchedConversations: Array<{
    user_id: number;
    conversation_id: number;
    full_name: string;
    photo: string | null;
  }>,
  findUsers: (event: any) => void,
  messages: Array<{
    id: number,
    conversation_id: number,
    message: string,
    created_at: string,
    sender_id: number
  }>,
  calculateTime: (created_at: string) => string
}

export const ContactsPresentaional: React.FC<Contacts> = ({
  matchedConversations,
  findUsers,
  messages,
  calculateTime
}) => {

  return (
    <MainContainer>
      <FindContactsContainer>
        <FindContactsInput
          placeholder="Search..."
          onChange={findUsers}
        />
      </FindContactsContainer>
      {matchedConversations.map((conversation) => {
        const lastMessage = messages.filter(msg => msg.conversation_id === conversation.conversation_id)[0];
        let timeOfLastMessage;
        if(lastMessage){
          timeOfLastMessage = calculateTime(lastMessage.created_at);
        } else {
          timeOfLastMessage = '';
        }

        return (
          <ContactBox
            key={conversation.conversation_id}
            to={`${conversation.full_name}&${conversation.conversation_id}`}
          > 
            {
              conversation.photo === null ?
              <PhotoContainer>
                <PermIdentityIcon style={{height: '100%', color: "white", width: '100%'}}/>
              </PhotoContainer> : 
              <ContactPhoto
                src={`${config.serverFilesUrl}users/${conversation.photo}`}
                alt="user photo"
              />
            }
            <ContactInfoContainer>
              <ContactName>{conversation.full_name}</ContactName>
              <LastMessage>{lastMessage?.message}</LastMessage>
            </ContactInfoContainer>
            <TimeOfLastMessage>{timeOfLastMessage}</TimeOfLastMessage>
          </ContactBox>)
      })}
    </MainContainer>
  )

}

export default ContactsPresentaional;