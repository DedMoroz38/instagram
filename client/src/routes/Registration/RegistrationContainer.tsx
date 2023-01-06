import React, { useContext, useEffect, useState } from 'react';
import RegistrationPresentational from './RegistrationPresentational';
import axios from 'axios';
import config from '../../config.json';
import { useForm } from 'react-hook-form';
import { ErrorPopUpContext } from '../../App';
import { useNavigate } from 'react-router-dom';


const RegistrationContainer: React.FC = () =>  {
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useContext(ErrorPopUpContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

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

  const showErrorShadow = (): void => {
    setIsError(true)
    setTimeout(() => {
      setIsError(false);
    }, 1000);
  }

  const registerFn = (data: any): void => {
    const {fullName, userName, email, password} = data;
    setIsLoading(true);
    axios.post(`${config.serverUrl}users/signup`, { 
      full_name: fullName,
      user_name: userName,
      login: email,
      password: password,
    }, { withCredentials: true })
    .then(res => {
      const user = res.data.user;
      console.log(user);
      navigate('/emailconfirmation', {
        state: {
          user: user
        }
      });
      setIsLoading(false);
    })
    .catch(err => {
      setIsLoading(false)
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
        setErrorMessage("Something went wrong:( Please try later. We will sort the problem out!");
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
      isLoading={isLoading}
     />
  )
}
export default RegistrationContainer;