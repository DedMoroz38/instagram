import styled from "styled-components";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import config from "../../config.json";
import ProfilePostsContainer from "../../components/ProfilePosts/ProfilePostsContainer";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const ProfileTopContainer = styled.div`
  display: flex;
`;

const ProfileIconBox = styled.div`
  display: felx;
  margin-right: 100px;
`;

const ProfileInfoBox = styled.div`
  display: felx;
  flex-direction: column;
`;

const IconBox = styled.div`
  width: 150px;
  height: 150px;
  display: felx;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  position: relative;
  &:hover > label {
    display: felx;
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
`;
const UserName = styled.h2`
  font-size: 28px;
  color: ${({ theme }) => theme.color};
  font-weight: 300;
`;  

const Name = styled.p`
  color: ${({ theme }) => theme.color};
`;

interface Profile {
  userInfo: {
    name: string,
    login: string,
    photo: string,
    id: string
  }
  changeProfileIconHandler: (event: any) => void
}

const ProfilePresentational: React.FC<Profile> = ({
  userInfo,
  changeProfileIconHandler
}) => {

  return (
    <MainContainer>
      <ProfileTopContainer>
        <ProfileIconBox>
          <IconBox>
            {
              userInfo.photo === null ? 
              <PermIdentityIcon style={{height: '100%', color: "white", width: '100%'}}/> : 
              <img style={{height: '100%', width: '100%', borderRadius: "50%"}} src={`${config.serverFilesUrl}users/${userInfo.photo}`} alt="" />
            }
            <ChangeIconButton 
              htmlFor="photo"
            ><AddAPhotoIcon style={{color: 'white'}} /></ChangeIconButton>
            <input style={{display: "none"}}
              onChange={changeProfileIconHandler}
              accept='image/*'
              type='file'
              id='photo'
            />
          </IconBox>
        </ProfileIconBox>
        <ProfileInfoBox>
          <UserName>maksimovegor70</UserName>
          <Name>{userInfo.name}</Name>
        </ProfileInfoBox>
      </ProfileTopContainer>
      <ProfilePostsContainer />
    </MainContainer>
  )
}

export default ProfilePresentational;