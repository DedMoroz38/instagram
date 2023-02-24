import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FindContactsInput } from './Contacts/ContactsPresentaional';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useGetUsers } from '../hooks/fetchHooks/users/useGetUsers';
import { CircularLoaidng, IdentityIcon } from './StyledIcons';
import axios from 'axios';
import { Scrollbar } from './Theme/globalStyles';
import useMessageLoad from '../hooks/fetchHooks/messanger/useMessageLoad';

const slideInAnimation = keyframes`
  0% {
    transform: translateX(-400px);
    box-shadow: 0 0 black;
  } 50%{
    transform: translateX(0);
  } 100% {
    box-shadow: 1px 8px 15px 1px black;
  }
`;

const MainContainer = styled.div`
  position: absolute;
  width: 400px;
  height: calc(100vh - 49px);
  left: 0;
  top: 49px;
  background: ${({theme}) => theme.background};
  z-index: 1;
  border-radius: 0 10px 10px 0;
  padding: 40px 20px;
  animation: ${slideInAnimation} 0.4s;
  animation-fill-mode: forwards; 
  color: ${({theme}) => theme.color};
  transition: all 0.3s linear;
  z-index: 2;
`;

const CloseButton = styled(CloseIcon)`
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
`
const UsersContainer = styled(Scrollbar)`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 90%;
  padding-bottom: 20px;
`;

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const UserBox = styled.div`
  flex-shrink: 0;
  padding-left: 10px;
  border-radius: 10px;
  height: 56px;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 5px;
  &:hover{
    background: #1a1e23;
  }
`;

const UserImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  aspect-ratio: 1/1;
`;

const UserInfoBox = styled.div`
  margin-left: 10px;
`;

const UserName = styled.div`
  font-weight: 600; 
`;

const Name = styled.div`
  font-weight: 300; 
  opacity: 0.5;
`;

const FollowButton = styled.button`
  border: none;
  background: ${({theme}) => theme.message};
  color: white;
  padding: 3px 8px;
  border-radius: 8px;
  cursor: pointer;
  position: absolute;
  right: 16px;
`;  

const UnfollowButton = styled(FollowButton)`
  background: transparent;
  border: 1px solid ${({theme}) => theme.message};
`;

const FindFriendsSideBar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [foundUsers, setFoundUsers] = useState<Array<{
    id: number,
    user_name: string,
    full_name: string,
    photo: string | null
  }>>([]);
  const [subscribedIds, setSubscribedIds] = useState<Array<number>>([]);
  const [usersGroupNumber, setUsersGroupNumber] = useState(0);
  const {loading, hasMore} = useGetUsers(
    query,
    setSubscribedIds,
    usersGroupNumber,
    setUsersGroupNumber,
    setFoundUsers
  );
  const observer = useRef();
 
  const lastUserRef = useCallback((node: any) => {
    if(loading) return;
    if(observer.current) observer.current?.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        setUsersGroupNumber(prevUsersGroupNumber => prevUsersGroupNumber + 1);
      } 
    })
    if(node) observer.current.observe(node);
  }, [loading, hasMore]);

  const followOrUnfollow = (userId: number) => {
    if(subscribedIds.includes(userId)){
      setSubscribedIds((prevSubscribedIds) =>
        prevSubscribedIds.filter((id) => id !== userId)
      );
    } else {
      setSubscribedIds(prevSubscribedIds => [...prevSubscribedIds, userId]);
    }
    axios.get(`friends/follow/${userId}`, 
    { withCredentials: true }
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const inputRef = useCallback((node: HTMLInputElement) => {
    if(!node) return;
    node.focus();
  }, [])

  useEffect(() => {
    if(!open){
      setFoundUsers([]);
      setSubscribedIds([]);
      setQuery('');
    }
  }, [open]);

  return (
    <>
      <SearchIcon
       onClick={() => setOpen(!open)}
       style={{cursor: 'pointer'}}
      />
      {
        open &&
        <MainContainer>
          <CloseButton onClick={() => setOpen(false)} />
          <FindContactsInput
            ref={inputRef}
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
          />
          {
            <UsersContainer>
            {
              foundUsers.map((user, index) => (
                <UserBox key={user.id} ref={foundUsers.length === index + 1 ? lastUserRef : null}>
                  { 
                    user.photo === null ?
                    <IdentityIcon dimensions='44px' />:
                    <UserImage 
                      src={`${process.env.REACT_APP_IMAGES_URL}users/${user.photo}`}
                      alt='profile image'
                    />
                  }
                  <UserInfoBox>
                    <UserName>{user.user_name}</UserName>
                    <Name>{user.full_name}</Name>
                  </UserInfoBox>
                  {
                    !subscribedIds.includes(user.id) ?
                    <FollowButton
                      onClick={() => followOrUnfollow(user.id)}
                    >follow</FollowButton> :
                    <UnfollowButton
                      onClick={() => followOrUnfollow(user.id)}
                    >unfollow</UnfollowButton>
                  }
                </UserBox>
              ))
            }
            {
              loading ?
              <LoadingBox>
                <CircularLoaidng dimensions='30px' />
              </LoadingBox> :
              null
            }
            </UsersContainer>
          }
        </MainContainer>
      }
    </>
  )
}

export default FindFriendsSideBar;


