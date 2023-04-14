import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useErrorPopUpContext } from "../../../ContextProviders/ClienErrorHandlingProvider";
import { Errors } from "../../../lib/errors/Errors";
import { useFetch } from "../useFetch"

export const useResendEmialConfirmation = (
  send: boolean,
  user: {
    id: number,
    fullName: string,
    login: string,
  },
  setSend: Dispatch<SetStateAction<boolean>>
): {loading: boolean} => {
  const [loading, setLoading] = useState(false);
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();

  useEffect(() => {
    if(send && user){
      setLoading(true);
      axios.post(`users/resendLoginConfirmationEmail`,
      { 
        user
      }, 
      { withCredentials: true })
      .then(res => {
      }).catch(err => {
        setErrorMessage(Errors.default);
        setErrorPopUpIsOpen(true);
      })
      .finally(() => {
        setLoading(false);
        setSend(false);
      })
    }
  }, [send, user])

  return {loading}
}