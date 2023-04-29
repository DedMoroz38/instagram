import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { useErrorPopUpContext } from "../../../ContextProviders/ClienErrorHandlingProvider";
import { createUser } from "../../../features/user/userSlice";
import { Errors } from "../../../lib/errors/Errors";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export const useIsLogedIn = (): {loading: boolean} => {
  const { pathname } = useLocation();
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
        setErrorMessage(Errors.default);
        setErrorPopUpIsOpen(true);
      }
    })
    .catch(err => {
      if (err.response.status === 401){
        navigate('/signin');
      } else {
        setErrorMessage(Errors.default);
        setErrorPopUpIsOpen(true);
      }
    })
    .finally(() => {
      setLoading(false);
    })
  }, [loading, pathname]);

  return {loading};
}

