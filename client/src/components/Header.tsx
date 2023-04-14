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
import { useWidthContext } from '../ContextProviders/WidthProivder';




const MainContainer = styled.div`
  transition: all 0.3s linear;
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 5px 10px;
  background: ${({ theme }) => theme.main.background};
  z-index: 1;
  @media (max-width: 420px) {
    width: 100vw;
    position: fixed;
    bottom: 0;
  }
`;
const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 210px;
  & > a {
    color: ${({ theme }) => theme.header.linkColor};
  }
  & > svg {
    color: ${({ theme }) => theme.header.linkColor};
  }
  @media (max-width: 420px) {
    width: 100%;
    & > a > svg, svg{
      font-size: 2rem;
    }
  }
`;


const StyledLink = styled(NavLink)`
  height: 24px;
  @media (max-width: 420px) {
    height: 32px !important;
  }
`;

const Header: React.FC = () => {
  const {isMobile} = useWidthContext()

  return (
    <MainContainer>
      {
        !isMobile &&
        <Toggle />
      }
      <LinksContainer>
        <StyledLink style={{height: '24px'}} to="/"><HomeIcon /></StyledLink>
        <StyledLink to="/messanger"><ChatIcon /></StyledLink>
        <ModalToAddPost />
        <FindFriendsSideBar />
        <StyledLink to="/profile" ><PermIdentityIcon /></StyledLink>
      </LinksContainer>
    </MainContainer>
  )
}
export default Header;

