import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import config from "../config.json";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { addFriends } from '../features/friends/friendsSlice';

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
`


export const Contacts: React.FC = () => {
  const userFriends = useAppSelector((state) => state.userFriends);
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.get(`${config.serverUrl}users/getFollowings`, 
    { 
      withCredentials: true
    })    
    .then(res => {
      if(res.status === 200){
        dispatch(addFriends(res.data.friends));
      }
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <MainContainer>
      {userFriends.friends.map((friend) => (
        <ContactBox
          key={friend.id}
          to={`/${friend.full_name}.${friend.id}`}
        >
          <ContactValue key={friend.id}>{friend.full_name}</ContactValue>
        </ContactBox>
      ))}
    </MainContainer>
  )
}
export default Contacts;
