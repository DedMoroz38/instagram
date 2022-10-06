import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config.json';
import axios from 'axios';
import { createUser } from '../../features/user/userSlice';
import { useAppDispatch } from '../../app/hooks';
import LoginPresentational from './LoginPresentational';
import { useForm } from 'react-hook-form';


const LoginContainer: React.FC<{}> = () =>  {
  const [isError, setIsError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
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
      console.log(err);
    });
  }

  useEffect(() => {
    if(Object.keys(errors).length === 0){
      setIsError(false);
    } else {
      setIsError(true)
      setTimeout(() => {
        setIsError(false);
      }, 1000);
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