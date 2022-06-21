import { Link } from 'react-router-dom';
import styled from 'styled-components';
import instagramIcon from '../images/instagramIcon.svg';
import Toggle from './Toggler';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ChatIcon from '@mui/icons-material/Chat';


const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  height: 50px;
  padding: 5px 10px;
`
const LinksContainer = styled.div`
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: space-around;
  &:last-child {
    filter: ${({ theme }) => theme.filter};
  }
`


const Header: React.FC<{}> = () => {

  return (
    <MainContainer>
      <Toggle />
      {/* <img src={instagramIcon} alt="mainIcon" /> */}
      <LinksContainer>
        <Link to="/" ><ChatIcon /></Link>
        <Link to="/profile" ><PermIdentityIcon /></Link>
      </LinksContainer>
    </MainContainer>
  )
}
export default Header;
