import axios from 'axios';
import { useEffect } from 'react';
import config from "../../config.json";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addFriends } from '../../features/friends/friendsSlice';
import ContactsPresentaional from './ContactsPresentaional';


export const ContactsContainer: React.FC = () => {
  const userFriends = useAppSelector((state) => state.userFriends);
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.get(`${config.serverUrl}friends/getFollowings`, 
    { 
      withCredentials: true
    })    
    .then(res => {
      if(res.status === 200){
        dispatch(addFriends(res.data.friends));
      }
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <ContactsPresentaional
      userFriends={userFriends.friends}
    />
  )
}
export default ContactsContainer;
