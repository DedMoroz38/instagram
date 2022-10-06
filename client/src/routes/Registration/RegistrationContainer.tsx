import React, { useContext, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { createUser } from '../../features/user/userSlice';
import RegistrationPresentational from './RegistrationPresentational';
import axios from 'axios';
import { useNavigate } from "react-router";
import config from '../../config.json';
import { useForm } from 'react-hook-form';
import { ErrorPopUpContext } from '../../App';

const RegistrationContainer: React.FC = () =>  {
  const {isOpen, setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useContext(ErrorPopUpContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fullName: "",
      userName: "",
      email: "",
      password: "",
    }
  });
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const showErrorShadow = (): void => {
    setIsError(true)
    setTimeout(() => {
      setIsError(false);
    }, 1000);
  }

  const registerFn = (data: any): void => {
    const {fullName, userName, email, password} = data;
    axios.post(`${config.serverUrl}users/signup`, { 
      full_name: fullName,
      user_name: userName,
      login: email,
      password: password,
    }, { withCredentials: true })
    .then(res => {
      console.log(res);
      dispatch(createUser(res.data.user));
      if(res.status === 201){
        navigate('/');
      }
    })
    .catch(err => {
      const errorMessage = err.response.data.message;
      showErrorShadow();
      if(errorMessage === `Username is taken!`){
        setError('userName', {
          message: err.response.data.message
        });
      } else if(errorMessage === `Email is already registered!`) {
        setError('email', {
          message: err.response.data.message
        });
      } else {
        setErrorMessage(errorMessage);
        setErrorPopUpIsOpen(true);
      }
    });
  }


  useEffect(() => {
    if(Object.keys(errors).length === 0){
      setIsError(false);
    } else {
      showErrorShadow();
    }
  }, [errors]);

  return (
    <RegistrationPresentational 
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      registerFn={registerFn}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      isError={isError}
     />
  )
}
export default RegistrationContainer;