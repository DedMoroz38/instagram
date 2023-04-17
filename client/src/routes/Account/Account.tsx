import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { useErrorPopUpContext } from '../../ContextProviders/ClienErrorHandlingProvider';
import { resetPosts } from '../../features/posts/followingsPostsSlice';
import useGetProfileInfo from '../../hooks/fetchHooks/profile/useGetProfileInfo';
import { Errors } from '../../lib/errors/Errors';
import ProfilePresentational from '../Profile/ProfilePresentational'
import AccountPostsContainer from './AccountPostsContainer';

export default function Account() {
  const { userId } = useParams();
  const [profileInfo, setProfileInfo] = useState({});
  const [userInfo, setUserInfo] = useState([]);
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();
  useGetProfileInfo(`${process.env.REACT_APP_SERVER_URL}users/getProfileInfo/${userId}`, setProfileInfo);

  const returnValue = (value: string) => {
    if(value === ''){
      return '0';
    }
    return value;
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}users/${userId}`, 
      { withCredentials: true }
    )    
    .then(res => {
      setUserInfo(res.data.profileInfo);
    })
    .catch(err => {
      setErrorMessage(Errors.default);
      setErrorPopUpIsOpen(true);
    });
  }, [userId])

  return (
    <ProfilePresentational 
      profileInfo={profileInfo}
      userInfo={userInfo}
      changeProfileIconHandler={null}
      returnValue={returnValue}
      logout={null}
    >
      <AccountPostsContainer />
    </ProfilePresentational>
  )
}
