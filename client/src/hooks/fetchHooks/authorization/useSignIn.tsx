import axios from 'axios';
import { useEffect, useState } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { useErrorPopUpContext } from '../../../ContextProviders/ClienErrorHandlingProvider';
import { createUser } from '../../../features/user/userSlice';

type signInData = {
  email: string | null;
  password: string | null;
}

export const useSignIn = ({
  email,
  password
  }: signInData,
  setError: UseFormSetError<{
    email: string;
    password: string;
  }>,
  showErrorShadow: () => void
): {loading: boolean} =>  {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();
  
  useEffect(() => {
    if(email && password){
      setLoading(true);
      axios.post(`users/login`, { 
        login: email,
        password: password,
      },
      { withCredentials: true }
      )
      .then(res => {
        if(res.status === 200){
          dispatch(createUser({...res.data.user}));
          navigate('/');
        }
      })
      .catch(err => {
        const errorStatusCode: number = err.response.status;
        showErrorShadow();
        if(errorStatusCode === 401){
          setError('email', {
            message: err.response.data.message
          });
        } else {
          setErrorMessage(err.response.data.message);
          setErrorPopUpIsOpen(true);
        }
      })
      .finally(() => {
        setLoading(false);
      })
    }
  }, [email, password]);

  return {loading};
};



