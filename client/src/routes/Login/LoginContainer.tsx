import React, { useEffect, useState } from 'react';
import LoginPresentational from './LoginPresentational';
import { useForm } from 'react-hook-form';
import { useThemeContext } from '../../ContextProviders/ThemeContextProvider';
import { useSignIn } from '../../hooks/fetchHooks/authorization/useSignIn';

type signInData = {
  email: string | null,
    password: string | null
}

const LoginContainer: React.FC<{}> = () =>  {
  const {themeMode} = useThemeContext();
  const [isError, setIsError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signInData, setSignInData] = useState<signInData>({
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
  const {loading} = useSignIn(signInData, setError, showErrorShadow);

  const signIn = (data: signInData) => {
    setSignInData(data);
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
      signIn={signIn}
      register={register}
      handleSubmit={handleSubmit}
      isError={isError}
      errors={errors}
      themeMode={themeMode}
      loading={loading}
    />
  )
}
export default LoginContainer;