import axios from "axios";
import config from "../../config.json";
import styled from "styled-components";
import { createUser } from "../../features/user/userSlice";
import { useRef, useState } from "react";
import FriendsPresentational from "./FriendsPresentational";

const FriendsContainer: React.FC = () => {
  const [newFriend, setNewFriend] = useState<string>('');
  const friendName = useRef<HTMLInputElement>(null);

  const searchForFriend = () => {
    const newFriendName = friendName.current!.value;
    if (newFriendName.length !== 0){
      axios.post(`${config.serverUrl}friends/getAccount`, 
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
      alert('Empty input!');
    }
  }

  const addFriend = () => {
    const newFriendName = friendName.current!.value;
    axios.post(`${config.serverUrl}friends/follow`, 
    {friendUName: newFriendName},
    { withCredentials: true }
    )
    .then(res => {
      if(res.status === 200){
        console.log(res.data);
      }
    })
    .catch(err => {
      console.log(err);
    })
}

  return (
    <FriendsPresentational
      friendName={friendName}
      searchForFriend={searchForFriend}
      addFriend={addFriend}
      newFriend={newFriend}
    />
  )
}
export default FriendsContainer;
