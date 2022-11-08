import { ButtonBox, ErrorMessage, FormInput, InputBox, RedirectLink, shadowAnimation, SubmitButton } from "./Login/LoginPresentational";
import { useContext } from "react";
import { ErrorPopUpContext, ThemeContext } from "../App";
import { useForm } from "react-hook-form";
import axios from "axios";
import config from '../config.json';
import {MainContainer, ResetPasswordForm, ResetPasswordMessage} from './PasswordResetRequest';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom'





const PasswordReset: React.FC = () => {
  const {themeMode}= useContext(ThemeContext);
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useContext(ErrorPopUpContext);
  const navigate = useNavigate();

  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const passwordResetToken = urlParams.get('token');
  const userId = urlParams.get('userId'); 
  
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors }
    } = useForm({
      defaultValues: {
        password: "",
        passwordConfirm: ""
      }
  });

  const resetPassword = (
    data: { password: string,
            passwordConfirm: string
          }): void => 
  {
    const { password, passwordConfirm } = data;
    if(password === passwordConfirm){
      axios.patch(`${config.serverUrl}users/resetPassword`, { 
        password,
        passwordResetToken,
        userId
      }, { withCredentials: true })
      .then(res => {
        navigate('/signin')
      }).catch(err => {
        if(err.status === 400){
          setErrorMessage(`Password reset token is invalid or has expired. Request a new one`);
          setErrorPopUpIsOpen(true);
        } else {
          setErrorMessage(`Something went wrong:( Please try later. We will sort the problem out!`);
          setErrorPopUpIsOpen(true);
        }
      })
    } else {
      setError('passwordConfirm', {
        message: 'Passwords do not match'
      });
    }
  }
  
  // if(isError){
  //   return (
  //     <MainContainer>

  //     </MainContainer>
  //   )
  // }

  return (
    <MainContainer>
      <ResetPasswordForm
        onSubmit={handleSubmit((data: any) => {
          resetPassword(data);
        })}
      >
        <ResetPasswordMessage>Set new password</ResetPasswordMessage>
        <InputBox>
          <ErrorMessage>{errors.password ? errors.password.message : ''}</ErrorMessage>
          <FormInput
            type='password' 
            style={{
              transition: 'all 0.3s linear' 
            }}
            placeholder='New password...'
            {...register('password', {
              required: {
                value: true,
                message: 'Please put in your new passord'
              },
              minLength: {
                value: 8,
                message: 'Password must contain at least 8 characters'
              }
            })}
          />
          <LockIcon style={{
              top: '4px',
              left: '5px',
              color: `${themeMode.iconColor}`,
              position: 'absolute'}} 
            />
        </InputBox>
        <InputBox
          style={{
            marginTop: '35px'
          }}
        >
          <ErrorMessage>{errors.passwordConfirm ? errors.passwordConfirm.message : ''}</ErrorMessage>
          <FormInput
            type='password' 
            style={{
              transition: 'all 0.3s linear' 
            }}
            placeholder='Password confirm...'
            {...register('passwordConfirm', {
              required: {
                value: true,
                message: 'Confirm your password'
              }
            })}
          />
          <LockIcon style={{
              top: '4px',
              left: '5px',
              color: `${themeMode.iconColor}`,
              position: 'absolute'}} 
            />
        </InputBox>
        <ButtonBox
          style={{
            marginTop: '30px',
            justifyContent: 'flex-end'
          }}
        >
          <SubmitButton 
            value="Submit"
          />
        </ButtonBox>
      </ResetPasswordForm>
    </MainContainer>
  )
}

export default PasswordReset;