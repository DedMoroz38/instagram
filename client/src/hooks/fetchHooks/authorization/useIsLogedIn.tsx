import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { useErrorPopUpContext } from "../../../ContextProviders/ClienErrorHandlingProvider";
import { createUser } from "../../../features/user/userSlice";


export const useIsLogedIn = (): {loading: boolean} => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();

  useEffect(() => {
    axios.get(`users/me`, 
      { withCredentials: true }
    )
    .then(res => {
      if(res.status === 200){
        const user = res.data.data;
        if (user.is_confirmed) {
          dispatch(createUser({...user}));
          setLoading(false);
        } else {
          navigate('/emailconfirmation', {
            state: {
              user: user
            }
          });
        }
      } else {
        setErrorMessage("Something went wrong:( Please try later. We will sort the problem out!");
        setErrorPopUpIsOpen(true);
      }
    })
    .catch(err => {
      console.log(err);
      if (err.response.status === 401){
        navigate('/signin');
      } else {
        setErrorMessage("Something went wrong:( Please try later. We will sort the problem out!");
        setErrorPopUpIsOpen(true);
      }
    })
    .finally(() => {
      setLoading(false);
    })
  }, [loading]);

  return {loading};
}

