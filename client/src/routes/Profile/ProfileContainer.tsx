import { useAppSelector, useAppDispatch } from '../../app/hooks';
import axios from "axios";
import { resetUser, updateUser } from '../../features/user/userSlice';
import ProfilePresentational from './ProfilePresentational';
import { useState } from 'react';
import { resetFriends } from '../../features/friends/conversationsSlice';
import { resetMessages } from '../../features/messages/messagesSlice';
import { resetPosts as resetUserPosts } from '../../features/posts/userPostsSlice';
import { resetPosts as resetFollowingsPosts } from '../../features/posts/followingsPostsSlice';
import { useNavigate } from 'react-router-dom';
import ProfilePostsContainer from '../../components/ProfilePosts/ProfilePostsContainer';
import useGetProfileInfo from '../../hooks/fetchHooks/profile/useGetProfileInfo';
import { useErrorPopUpContext } from '../../ContextProviders/ClienErrorHandlingProvider';
import { Errors } from '../../lib/errors/Errors';

const ProfileContainer: React.FC = () => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();

  const [profileInfo, setProfileInfo] = useState({});
  
  const logout = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}users/logout`,
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
      setErrorMessage(Errors.default);
      setErrorPopUpIsOpen(true);
    });
  }

  const changeProfileIconHandler = function (event: { target: { files: (string | Blob)[]; }; }) {
    const form = new FormData();
    form.append('photo', event.target.files[0]);
    axios.patch(`${process.env.REACT_APP_SERVER_URL}users/updateMe`,
      form,
      { withCredentials: true }
    )
    .then(res => {
      dispatch(updateUser(res.data.user.photo));
    })
    .catch(err => {
    });
  };
  useGetProfileInfo(`${process.env.REACT_APP_SERVER_URL}users/getProfileInfo`, setProfileInfo);

  const returnValue = (value: string) => {
    if(value === ''){
      return '0';
    }
    return value;
  }

  
  return (
    <ProfilePresentational
      profileInfo={profileInfo}
      userInfo={userInfo}
      changeProfileIconHandler={changeProfileIconHandler}
      returnValue={returnValue}
      logout={logout}
    >
      <ProfilePostsContainer />
    </ ProfilePresentational>
  )
}
export default ProfileContainer;

