import { NavLink } from "react-router-dom";
import styled from "styled-components";

const MainContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
  list-style-type: none;
  margin-right: 5px;
  width: 30vw;
  box-sizing: border-box;

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
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 10px;
`

const FindContactsInput = styled.input`
  width: 80%;
  height: 40px;
  border-radius: 20px;
  border: none;
  background: transparent;
  font-size: 15px;
  color: ${({ theme }) => theme.color};
  width: 500px;
  transition: all 0.3s linear; 
  border: 1px solid rgb(207, 205, 202);
  padding: 5px 20px 5px 20px;
`

const ContactBox = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 2px 10px;
  margin-bottom: 10px;
  height: 56px;
  &:hover {
    background: grey;
  }
`;
const ContactValue = styled.div`
  color: ${({ theme }) => theme.color}
`;

interface Contacts{
  matchedConversations: Array<{
    user_id: number;
    conversation_id: number;
    full_name: string;
  }>,
  findUsers: (event: any) => void
}

export const ContactsPresentaional: React.FC<Contacts> = ({
  matchedConversations,
  findUsers
}) => {

  return (
    <MainContainer>
      <FindContactsContainer>
        <FindContactsInput
          placeholder="Search..."
          onChange={findUsers}
        />
      </FindContactsContainer>
      {matchedConversations.map((conversation) => (
        <ContactBox
          key={conversation.user_id}
          to={`${conversation.full_name}.${conversation.user_id}`}
        >
          <ContactValue>{conversation.full_name}</ContactValue>
        </ContactBox>
      ))}
    </MainContainer>
  )

}

export default ContactsPresentaional;