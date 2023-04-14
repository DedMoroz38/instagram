import axios from 'axios';
import { useEffect, useState } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useErrorPopUpContext } from '../../../ContextProviders/ClienErrorHandlingProvider';
import { Errors } from '../../../lib/errors/Errors';

type signUpData = {
  fullName: string | null;
  userName: string | null;
  email: string | null;
  password: string | null;
}

export const useSignUp = ({
  fullName,
  userName,
  email,
  password
  }: signUpData,
  setError: UseFormSetError<{
    fullName: string;
    userName: string;
    email: string;
    password: string;
  }>,
  showErrorShadow: () => void
): {loading: boolean} =>  {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();

  useEffect(() => {
    if(email && password && fullName && userName){
      setLoading(true);
      axios.post(`users/signup`, { 
        full_name: fullName,
        user_name: userName,
        login: email,
        password: password,
      }, { withCredentials: true })
      .then(res => {
        const user = res.data.user;
        navigate('/emailconfirmation', {
          state: {
            user: user
          }
        });
        setLoading(false);
      })
      .catch(err => {
        setLoading(false)
        const errorStatusCode: number = err.response.status;
        showErrorShadow();
        if(errorStatusCode === 403){
          setError('userName', {
            message: err.response.data.message
          });
        } else if(errorStatusCode === 409) {
          setError('email', {
            message: err.response.data.message
          });
        } else {
          setErrorMessage(Errors.default);
          setErrorPopUpIsOpen(true);
        }
      })
      .finally(() => {
        setLoading(false);
      })
    }
  }, [email, password, fullName, userName]);

  

  return {loading};
};



