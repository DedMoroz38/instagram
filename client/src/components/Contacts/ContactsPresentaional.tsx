import styled from "styled-components";
import { Scrollbar } from "../Theme/globalStyles";
import ContactBox from "./contactBox.tsx/contactBox";

const MainContainer = styled(Scrollbar)`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  list-style-type: none;
  flex: 2;
  box-sizing: border-box;
  padding: 0 15px 11px;
`;

const FindContactsContainer = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 10px;
`

export const FindContactsInput = styled.input`
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
  padding-left: 16px;
  &::placeholder {
    padding-left: 5px;
  }
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
    message_id: number,
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
            conversation={conversation}
            lastMessage={lastMessage}
            timeOfLastMessage={timeOfLastMessage}
           />
        )
      })}
    </MainContainer>
  )

}

export default ContactsPresentaional;