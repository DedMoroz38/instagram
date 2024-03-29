import React, { useEffect, useState } from 'react';
import RegistrationPresentational from './RegistrationPresentational';
import { useForm } from 'react-hook-form';
import { useThemeContext } from '../../ContextProviders/ThemeContextProvider';
import { useSignUp } from '../../hooks/fetchHooks/authorization/useSignUp';

type signUpData = {
  fullName: string | null;
  userName: string | null;
  email: string | null;
  password: string | null;
}

const RegistrationContainer: React.FC = () =>  {
  const {themeMode}= useThemeContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [signUpData, setSignUpData] = useState<signUpData>({
    fullName: null,
    userName: null,
    email: null,
    password: null
  });
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

  const {loading} = useSignUp(signUpData, setError, showErrorShadow)

  const signUp = (data: signUpData) => {
    setSignUpData(data);
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
      signUp={signUp}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      isError={isError}
      loading={loading}
      themeMode={themeMode}
     />
  )
}
export default RegistrationContainer;