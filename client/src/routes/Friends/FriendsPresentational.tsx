import { RefObject } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 30px auto;
  align-items: center;
  box-shadow: 0px 0px 10px red;
  color: ${({ theme }) => theme.color};
  padding: 10px;
`;

const Input = styled.input`
  font-size: 15px;
  padding-left: 10px;
  border: none;
  height: 40px;
  border-radius: 5px;
  width: 100%;
  margin: 30px;
`;

const SendButton = styled.button`
  border: none;
  padding: 2px 5px;
  font-size: 18px;
`;

interface Friends {
  friendName: RefObject<HTMLInputElement>,
  searchForFriend: () => void,
  addFriend: () => void,
  newFriend: string
}

const FriendsPresentational: React.FC<Friends> = ({
  friendName,
  searchForFriend,
  addFriend,
  newFriend
}) => {

  return (
    <MainContainer>
      <h1>Friends</h1>
      <Input ref={friendName} placeholder="Friend Name..." />
      <SendButton onClick={() => searchForFriend()}>Search</SendButton>
      <div style={{display: 'flex', marginTop: '20px'}}>
        <p>
        {
          newFriend === "" ?
          "Find new friend" :
          newFriend
        }
        </p>
        <button onClick={() => addFriend()}>Follow</button>
      </div>
    </MainContainer>
  )
}

export default FriendsPresentational;