import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
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

  useEffect(() => {
    if(send && user){
      setLoading(true);
      axios.post(`users/resendLoginConfirmationEmail`,
      { 
        user
      }, 
      { withCredentials: true })
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setSend(false);
      })
    }
  }, [send, user])

  return {loading}
}