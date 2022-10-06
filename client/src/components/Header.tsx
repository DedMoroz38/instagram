import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';
import Toggle from './Toggler';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import config from '../config.json';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import ModalToAddPost from './AddNewPostComponents/ModalToAddPost';
import { useContext, useState } from 'react';
import ModalWindow from './AddNewPostComponents/ModalWindow';
import { ModalContext } from './Dashboard';
import ErrorPopUp from './ErrorPopUp';
import { ErrorPopUpContext } from '../App';


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
  &:last-child {
    filter: ${({ theme }) => theme.filter};
  }
`;


const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // for posts TODO-find better way to solve it

  const logout = () => {
    axios.get(`${config.serverUrl}users/logout`,
    { withCredentials: true }
    )
    .then(res => {
      if(res.status === 200){
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
        <Link to="/" ><HomeIcon /></Link>
        <ModalWindow
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <ModalToAddPost
            onClose={() => setIsOpen(false)}
          />
        </ModalWindow>
        <AddCircleOutlineIcon 
          onClick={() => setIsOpen(true)}
        />
        <Link to="/messanger" ><ChatIcon /></Link>
        <Link to="/profile" ><PermIdentityIcon /></Link>
        <Link to="/friends" ><SearchIcon /></Link>
        <div onClick={() => logout()} ><LogoutIcon /></div>
      </LinksContainer>
    </MainContainer>
  )
}
export default Header;
