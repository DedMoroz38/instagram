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
  userFriends: Array<{
    id: string,
    full_name: string
  }>
}

export const ContactsPresentaional: React.FC<Contacts> = ({
  userFriends
}) => {
  return (
    <MainContainer>
      {userFriends.map((friend) => (
        <ContactBox
          key={friend.id}
          to={`${friend.full_name}.${friend.id}`}
        >
          <ContactValue key={friend.id}>{friend.full_name}</ContactValue>
        </ContactBox>
      ))}
    </MainContainer>
  )

}

export default ContactsPresentaional;