import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config.json';
import axios from 'axios';
import { createUser } from '../../features/user/userSlice';
import { useAppDispatch } from '../../app/hooks';
import LoginPresentational from './LoginPresentational';
import { useForm } from 'react-hook-form';
import { ErrorPopUpContext } from '../../App';


const LoginContainer: React.FC<{}> = () =>  {
  const {isOpen, setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useContext(ErrorPopUpContext);
  const [isError, setIsError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginFn = (data: any) => {
    const {email, password} = data;

    axios.post(`${config.serverUrl}users/login`, { 
      login: email,
      password: password,
    },
    { withCredentials: true }
    )
    .then(res => {
      if(res.status === 200){
        dispatch(createUser({...res.data.user}));
        navigate('/', {
          state: {
            loginStatus: true
          }
        });
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
    });
  }

  const showErrorShadow = (): void => {
    setIsError(true)
    setTimeout(() => {
      setIsError(false);
    }, 1000);
  }

  useEffect(() => {
    if(Object.keys(errors).length === 0){
      setIsError(false);
    } else {
      showErrorShadow();
    }
  }, [errors]);

  return (
    <LoginPresentational
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      loginFn={loginFn}
      register={register}
      handleSubmit={handleSubmit}
      isError={isError}
      errors={errors}
    />
  )
}
export default LoginContainer;