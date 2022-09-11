import { useAppSelector, useAppDispatch } from '../../app/hooks';
import axios from "axios";
import { updateUser } from '../../features/user/userSlice';
import config from "../../config.json";
import ProfilePresentational from './ProfilePresentational';
import { useEffect } from 'react';


const ProfileContainer: React.FC = () => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();

  const changeProfileIconHandler = function (event: { target: { files: (string | Blob)[]; }; }) {
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
    <ProfilePresentational
      userInfo={userInfo}
      changeProfileIconHandler={changeProfileIconHandler}
    />
  )
}
export default ProfileContainer;

