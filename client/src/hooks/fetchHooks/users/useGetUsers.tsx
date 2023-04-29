import axios from "axios"
import { useEffect, useState } from "react"
import { useErrorPopUpContext } from "../../../ContextProviders/ClienErrorHandlingProvider";
import { Errors } from "../../../lib/errors/Errors";

const CancelToken = axios.CancelToken;

export const useGetUsers = (
  query: string,
  usersGroupNumber: number,
  setUsersGroupNumber: React.Dispatch<React.SetStateAction<number>>,
  areIdsNeeded: boolean,
  extraCheck: boolean = true
  ) => {
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{
    users: Array<{
      id: number,
      full_name: string,
      user_name: string,
      photo: string
    }>,
  }>();

  let cancel: () => void;
  const [hasMore, setHasMore] = useState(true);

  const resetState = () => {
    setUsersGroupNumber(0);
    setHasMore(true);
  }

  useEffect(() => {
    if (query === ''){
      resetState();
      return;
    };
    if (!extraCheck) return;
    setLoading(true);
    axios.get(`friends/getAccounts/${query}/${usersGroupNumber}/${areIdsNeeded}`, 
    { 
      withCredentials: true,
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    }
    )
    .then(res => {
      setData(res.data);
      if(res.data.users.length < 10){
        setHasMore(false);
      }
    })
    .catch((err) => {
      if(axios.isCancel(err)){
        return
      }
      setErrorMessage(Errors.default);
      setErrorPopUpIsOpen(true);
    })
    .finally(() => {
      setLoading(false);
    })
    return () => cancel();
  }, [query, usersGroupNumber])

  useEffect(() => {
    resetState();
  }, [query]);


  return {loading, hasMore, data}
}