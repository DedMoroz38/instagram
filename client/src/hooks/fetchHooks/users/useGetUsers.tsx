import axios from "axios"
import { useEffect, useState } from "react"

const CancelToken = axios.CancelToken;

export const useGetUsers = (
  query: string,
  setSubscribedIds: React.Dispatch<React.SetStateAction<number[]>>,
  usersGroupNumber: number,
  setUsersGroupNumber: React.Dispatch<React.SetStateAction<number>>,
  setFoundUsers: React.Dispatch<React.SetStateAction<{
    id: number;
    user_name: string;
    full_name: string;
    photo: string | null;
}[]>>
  ) => {
  const [loading, setLoading] = useState<boolean>(false);
  
  let cancel: () => void;
  const [hasMore, setHasMore] = useState(true);

  const resetState = () => {
    setFoundUsers([]);
    setSubscribedIds([]);
    setUsersGroupNumber(0);
    setHasMore(true);
  }

  useEffect(() => {
    if (query === ''){
      resetState();
      return;
    };
    setLoading(true);
    axios.get(`friends/getAccounts/${query}/${usersGroupNumber}`, 
    { 
      withCredentials: true,
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    }
    )
    .then(res => {
      const {users, subscribedIds} = res.data;
      setFoundUsers((prevUsers) => [ ...prevUsers, ...users]);
      setSubscribedIds((prevSubscribedIds) => [ ...prevSubscribedIds, ...subscribedIds]);
      if(users.length < 10){
        setHasMore(false);
      }
    })
    .catch((err) => {
      if(axios.isCancel(err)){
        return
      }
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    })
    return () => cancel();
  }, [query, usersGroupNumber])

  useEffect(() => {
    resetState();
  }, [query]);


  return {loading, hasMore}
}