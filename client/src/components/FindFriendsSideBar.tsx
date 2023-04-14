import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FindContactsInput } from './Contacts/ContactsPresentaional';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useGetUsers } from '../hooks/fetchHooks/users/useGetUsers';
import { CircularLoaidng, IdentityIcon } from './StyledIcons';
import axios from 'axios';
import { Scrollbar } from './Theme/globalStyles';
import { useOutsideAlerter } from '../hooks/useOutsideAlerter';
import { Link } from 'react-router-dom';
import { Errors } from '../lib/errors/Errors';
import { useErrorPopUpContext } from '../ContextProviders/ClienErrorHandlingProvider';

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
  cursor: pointer;
  position: absolute;
  width: 400px;
  height: calc(100vh - 49px);
  left: 0;
  top: 49px;
  background: ${({theme}) => theme.background};
  border-radius: 0 10px 10px 0;
  padding: 40px 20px;
  color: ${({theme}) => theme.color};
  animation: ${slideInAnimation} 0.4s;
  animation-fill-mode: forwards; 
  transition: all 0.3s linear;
  z-index: 3;
  @media (max-width: 420px) {
    box-shadow: none;
    border-radius: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    animation: none;
    padding: 40px 20px 0 20px;
  }
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

const UserBox = styled(Link)`
  color: ${({theme}) => theme.color};
  text-decoration: none;
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

const NoUsersMessage = styled.p`
  text-align: center;
`

const FindFriendsSideBar: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>();
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [foundUsers, setFoundUsers] = useState<Array<{
    user_id: number,
    user_name: string,
    full_name: string,
    photo: string | null
  }>>([]);
  const [subscribedIds, setSubscribedIds] = useState<Array<number>>([]);
  const [usersGroupNumber, setUsersGroupNumber] = useState(0);
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();
  const {loading, hasMore, data} = useGetUsers(
    query,
    usersGroupNumber,
    setUsersGroupNumber,
    true
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
    })
    .catch(err => {
      setErrorMessage(Errors.default);
      setErrorPopUpIsOpen(true);
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

  useEffect(() => {
    setSubscribedIds([]);
    setFoundUsers([]);
  }, [query]);

  useEffect(() => {
    if(!data) return;
    const {users, subscribedIds} = data;
    setFoundUsers((prevUsers) => [ ...prevUsers, ...users]);
    setSubscribedIds((prevSubscribedIds) => [ ...prevSubscribedIds, ...subscribedIds]);
  }, [data]);

  useOutsideAlerter(boxRef, () => setOpen(false));

  return (
    <>
      <SearchIcon
       onClick={() => setOpen(!open)}
       style={{cursor: 'pointer'}}
      />
      {
        open &&
        <MainContainer ref={boxRef}>

          <CloseButton onClick={() => setOpen(false)} />
          <FindContactsInput
            ref={inputRef}
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
          />
          {
            <UsersContainer>
            {
              foundUsers.length === 0 &&
              <NoUsersMessage>Start typing to find other users</NoUsersMessage>
            }
            {
              foundUsers.map((user, index) => (
                <UserBox 
                  key={user.user_id}
                  ref={foundUsers.length === index + 1 ? lastUserRef : null}
                  to={`${user.user_id}`}
                  onClick={() => setOpen(false)}
                >
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
                    !subscribedIds.includes(user.user_id) ?
                    <FollowButton
                      onClick={() => followOrUnfollow(user.user_id)}
                    >follow</FollowButton> :
                    <UnfollowButton
                      onClick={() => followOrUnfollow(user.user_id)}
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




