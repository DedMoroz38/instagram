import axios from "axios";
import { useRef, useState } from "react";
import FriendsPresentational from "./FriendsPresentational";
import { useErrorPopUpContext } from "../../ContextProviders/ClienErrorHandlingProvider";
import { Errors } from "../../lib/errors/Errors";

const FriendsContainer: React.FC = () => {
  const [newFriend, setNewFriend] = useState<string>('');
  const friendName = useRef<HTMLInputElement>(null);
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();

  const searchForFriend = () => {
    const newFriendName = friendName.current!.value;
    if (newFriendName.length !== 0){
      axios.post(`${process.env.REACT_APP_SERVER_URL}friends/getAccount`, 
      {friendName: newFriendName},
      { withCredentials: true }
      ) 
      .then(res => {
        if(res.status === 200){
          setNewFriend(res.data.friend.user_name);
        }
      })
      .catch(err => {
        setErrorMessage(Errors.default);
        setErrorPopUpIsOpen(true);
      })
    } else {
      alert('Empty input!');
    }
  }

  const addFriend = () => {
    const newFriendName = friendName.current!.value;
    const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();
    axios.post(`${process.env.REACT_APP_SERVER_URL}friends/follow`, 
    {friendUName: newFriendName},
    { withCredentials: true }
    )
    .then(res => {
      if(res.status === 200){
      }
    })
    .catch(err => {
      setErrorMessage(Errors.default);
      setErrorPopUpIsOpen(true);
    })
}

  return (
    <FriendsPresentational
      friendName={friendName}
      searchForFriend={searchForFriend}
      addFriend={addFriend}
      newFriend={newFriend}
    />
  )
}
export default FriendsContainer;
