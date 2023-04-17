import axios from 'axios';
import React, { SetStateAction, useEffect } from 'react'
import { useErrorPopUpContext } from '../../../ContextProviders/ClienErrorHandlingProvider';
import { Errors } from '../../../lib/errors/Errors';

const useGetProfileInfo = (url: string, setProfileInfo: (value: SetStateAction<{}>) => void) => {
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();
  useEffect(() => {
    axios.get(url,
      { withCredentials: true }
    )
    .then(res => {
      setProfileInfo(prevProfileInfo => ({
        ...prevProfileInfo,
        ...res.data.profileInfo
      }));
    })
    .catch(err => {
      setErrorMessage(Errors.default);
      setErrorPopUpIsOpen(true);
    });
  }, [])

  return null;
}

export default useGetProfileInfo
