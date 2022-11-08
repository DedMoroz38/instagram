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
  padding-top: 30px;
  width: 600px;
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
const UserName = styled.p`
  font-size: 22px;
  font-weight: 300;
`;  

const Name = styled.p`
`;

interface Profile {
  userInfo: {
    name: string,
    login: string,
    user_name: string,
    photo: string,
    id: string
  }
  changeProfileIconHandler: (event: any) => void,
  profileInfo: any
}

const ProfilePresentational: React.FC<Profile> = ({
  userInfo,
  changeProfileIconHandler,
  profileInfo
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
          <ProfileInfoRow>
            <UserName>{userInfo.user_name}</UserName>
          </ProfileInfoRow>
          <ProfileInfoRow>
            <InfoString><span>{profileInfo.number_of_posts}</span> post</InfoString>
            <InfoString><span>{profileInfo.number_of_subscriptions}</span> followers</InfoString>
            <InfoString><span>{profileInfo.number_of_subscribers}</span> following</InfoString>
          </ProfileInfoRow>
          <ProfileInfoRow>
            <Name>{userInfo.name}</Name>
          </ProfileInfoRow>
          
        </ProfileInfoBox>
      </ProfileTopContainer>
      <ProfilePostsContainer />
    </MainContainer>
  )
}

export default ProfilePresentational;