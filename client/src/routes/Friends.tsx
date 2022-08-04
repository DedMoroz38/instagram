import axios from "axios";
import config from "../config.json";
import styled from "styled-components";
import { createUser } from "../features/user/userSlice";
import { useRef, useState } from "react";

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

const Friends: React.FC = () => {
  const [newFriend, setNewFriend] = useState<string>('');
  const friendName = useRef<HTMLInputElement>(null);

  const searchForFriend = () => {
      const newFriendName = friendName.current!.value;
      if (newFriendName.length !== 0){
        axios.post(`${config.serverUrl}users/getFriend`, 
        {friendName: newFriendName},
        { withCredentials: true }
        )
        .then(res => {
          if(res.status === 200){
            setNewFriend(res.data.friend.user_name);
          }
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      alert('Emty input!');
    }
  }

  return (
    <MainContainer>
      <h1>Friends</h1>
      <Input ref={friendName} placeholder="Friend Name..." />
      <SendButton onClick={() => searchForFriend()}>Send</SendButton>
      <p>
        {
          newFriend === "" ?
          "Find new friend" :
          newFriend
        }
      </p>
    </MainContainer>
  )
}
export default Friends;
