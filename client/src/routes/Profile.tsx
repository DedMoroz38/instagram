import styled from "styled-components";
import type { RootState } from '../app/store';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useState } from "react";
import axios from "axios";
import { updateUser } from '../features/user/userSlice';
import config from "../config.json";


const MainContainer = styled.div`
  max-width: 1170px;
  border: 1px solid red;
  margin: 0 auto;
`;

const ProfileTop = styled.div`
  display: felx;
`;

const IconBox = styled.div`
  width: 100px;
  height: 100px;
  display: felx;
  border: 1px solid red;
  border-radius: 50%;
  justify-content: center;
  align-items: center
`;

const Name = styled.div`
  color: ${({ theme }) => theme.color};
`;


const Profile: React.FC = () => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();

  const changeHandler = function (event: any) {
    const form = new FormData();
    form.append('photo', event.target.files[0]);

    axios.patch(`${config.serverUrl}users/updateMe`,
      form,
      { withCredentials: true }
    )
    .then(res => {
      console.log(res);
      dispatch(updateUser(res.data.user.photo));
    })
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <MainContainer>
      <ProfileTop>
        <IconBox>
          {
            userInfo.photo === null ? 
            <PermIdentityIcon style={{height: '100%', color: "white", width: '100%'}}/> : 
            <img style={{height: '100%', width: '100%', borderRadius: "50%"}} src={`${config.serverFilesUrl}users/${userInfo.photo}`} alt="" />
           }
        </IconBox>
      </ProfileTop>
      <input style={{display: "none"}}
        onChange={changeHandler}
        accept='image/*'
        type='file'
        id='photo'
      />
      <label 
        style={{color: "white", border: '1px dotted white'}}
        htmlFor="photo"
        >Choose new photo</label>
      <Name>{userInfo.name}</Name>
    </MainContainer>
  )
}
export default Profile;

