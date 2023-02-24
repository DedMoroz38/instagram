import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';
import Toggle from './Toggler';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import config from '../config.json';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ModalToAddPost from './AddNewPostComponents/ModalToAddPost';
import { useAppDispatch } from '../app/hooks';
import { resetUser } from '../features/user/userSlice';
import { resetMessages } from '../features/messages/messagesSlice';
import { resetFriends } from '../features/friends/conversationsSlice';
import { resetPosts as resetUserPosts } from '../features/posts/userPostsSlice';
import { resetPosts as resetFollowingsPosts } from '../features/posts/followingsPostsSlice';
import FindFriendsSideBar from './FindFriendsSideBar';
import { green } from '@mui/material/colors';




const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  height: 50px;
  padding: 5px 10px;
`;
const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 250px;
  // &:last-child {
  //   filter: ${({ theme }) => theme.filter};
  // }
  & > a {
    color: ${({ theme }) => theme.color};
  }
  & > svg {
    color: ${({ theme }) => theme.color};
  }
`;

const StyledLink = styled(NavLink)`
  color: black;
`;


const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    axios.get(`${config.serverUrl}users/logout`,
    { withCredentials: true }
    )
    .then(res => {
      if(res.status === 200){
        dispatch(resetUser());
        dispatch(resetFriends());
        dispatch(resetMessages());
        dispatch(resetFollowingsPosts());
        dispatch(resetUserPosts());
        navigate('/signin');
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <MainContainer>
      <Toggle />
      <LinksContainer>
        <NavLink to="/" style={({ isActive }) => ({color: `${isActive ? 'green' : 'black'}`})} ><HomeIcon /></NavLink>
        <ModalToAddPost />
        <NavLink to="/messanger"><ChatIcon /></NavLink>
        <NavLink to="/profile" ><PermIdentityIcon /></NavLink>
        <FindFriendsSideBar />
        <LogoutIcon style={{cursor: 'pointer'}} onClick={() => logout()} />
      </LinksContainer>
    </MainContainer>
  )
}
export default Header;

