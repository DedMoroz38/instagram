import styled from "styled-components";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ProfilePostsContainer from "../../components/ProfilePosts/ProfilePostsContainer";
import { Scrollbar } from "../../components/Theme/globalStyles";
import LogoutIcon from '@mui/icons-material/Logout';
import { IdentityIcon } from "../../components/StyledIcons";

const MainContainer = styled(Scrollbar)`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  @media (max-width: 420px) {
    margin-bottom: auto;
  }
`;

const ProfileTopContainer = styled.div`
  display: flex;
  padding-top: 30px;
  width: 600px;
  position: relative;
  @media (max-width: 420px) {
    padding: 0;
    width: auto;
    margin-bottom: auto;
    margin-top: 60px;
  }
`;

const ProfileIconBox = styled.div`
  display: felx;
  margin-right: 50px;
`;

const ProfileInfoBox = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.color};
  height: 110px;
  margin-top: 10px;
`;

const ProfileInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoString = styled.p`
  & > span {
    font-weight: 600;
  }
`

const IconBox = styled.div`
  width: 150px;
  height: 150px;
  display: felx;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  position: relative;
  &:hover > label {
    display: flex;
  }
  @media (max-width: 420px) {
    width: 80px;
    height: 80px;
  }
`;

const ChangeIconButton = styled.label`
  position: absolute;
  top: 0;
  background: linear-gradient(
    rgba(0, 0, 0, 0.5), 
    rgba(0, 0, 0, 0.5)
  );
  color: white;
  width: 150px;
  height: 150px;
  display: none;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  transition: background 0.3s;
  @media (max-width: 420px) {
    width: 80px;
    height: 80px;
  }
`;
const UserName = styled.p`
  font-size: 22px;
  font-weight: 300;
`;  

const LogOutButton = styled(LogoutIcon)`
  color: ${({ theme }) => theme.header.linkColor};
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 40px;
  @media (max-width: 420px) {
    top: 10px;
  }
`;

const Name = styled.p`
`;

const Icon = styled(PermIdentityIcon)`
  border: 1px solid ${({theme}) => theme.color};
  border-radius: 50%;
  height: 100% !important;
  color: ${({ theme }) => theme.color};
  width: 100% !important;
`;

interface Profile {
  userInfo: {
    name: string,
    login: string,
    user_name: string,
    photo: string | null,
    id: number
  }
  changeProfileIconHandler: (event: any) => void | null,
  profileInfo: any,
  returnValue: (value: string) => string,
  logout: () => void | null,
  children: JSX.Element
}

const ProfilePresentational: React.FC<Profile> = ({
  userInfo,
  changeProfileIconHandler,
  profileInfo,
  returnValue,
  logout,
  children
}) => {
  return (
    <MainContainer>
      <ProfileTopContainer>
        <ProfileIconBox>
          <IconBox>
            {
              userInfo.photo === null || !userInfo.photo ? 
              <Icon /> :
              <img 
                style={{height: '100%', width: '100%', borderRadius: "50%"}}
                src={`${process.env.REACT_APP_IMAGES_URL}users/${userInfo.photo}`} 
              alt="my avatar" />
            }
            {
              changeProfileIconHandler !==  null &&
              <>
                <ChangeIconButton 
                  htmlFor="photo"
                ><AddAPhotoIcon style={{color: 'white'}} /></ChangeIconButton>
                <input style={{display: "none"}}
                  onChange={changeProfileIconHandler}
                  accept='image/*'
                  type='file'
                  id='photo'
                />
              </>
            }
          </IconBox>
        </ProfileIconBox>
        <ProfileInfoBox>
          <ProfileInfoRow>
            <UserName>{userInfo.user_name}</UserName>
          </ProfileInfoRow>
          <ProfileInfoRow>
            <InfoString><span>{returnValue(profileInfo.number_of_posts)}</span> post</InfoString>
            <InfoString><span>{returnValue(profileInfo.number_of_subscriptions)}</span> followers</InfoString>
            <InfoString><span>{returnValue(profileInfo.number_of_subscribers)}</span> following</InfoString>
          </ProfileInfoRow>
          <ProfileInfoRow>
            <Name>{userInfo.name}</Name>
          </ProfileInfoRow>
          
        </ProfileInfoBox>
        {
          logout !== null &&
          <LogOutButton onClick={() => logout()} />
        }
      </ProfileTopContainer>
      {children}
    </MainContainer>
  )
}

export default ProfilePresentational;