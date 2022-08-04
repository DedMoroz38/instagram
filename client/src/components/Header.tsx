import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';
import Toggle from './Toggler';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import config from '../config.json';

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  height: 50px;
  padding: 5px 10px;
`;
const LinksContainer = styled.div`
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: space-around;
  &:last-child {
    filter: ${({ theme }) => theme.filter};
  }
`;


const Header: React.FC<{}> = () => {
  const navigate = useNavigate();

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
        <Link to="/" ><ChatIcon /></Link>
        <Link to="/profile" ><PermIdentityIcon /></Link>
        <Link to="/friends" >FD</Link>
        <div onClick={() => logout()} ><LogoutIcon /></div>
      </LinksContainer>
    </MainContainer>
  )
}
export default Header;
