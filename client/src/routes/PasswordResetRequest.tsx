import styled from "styled-components";
import EmailIcon from '@mui/icons-material/Email';
import { ButtonBox, ErrorMessage, FormInput, InputBox, RedirectLink, shadowAnimation, SubmitButton } from "./Login/LoginPresentational";
import { useContext, useState } from "react";
import { ErrorPopUpContext, ThemeContext } from "../App";
import { useForm } from "react-hook-form";
import axios from "axios";
import config from '../config.json';

export const MainContainer = styled.div`
  animation: ${shadowAnimation} 4s infinite alternate;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  border-radius: 15px 100px;
  padding: 30px 0;
`;

export const ResetPasswordForm = styled.form`
  width: 300px;
`;

export const ResetPasswordMessage = styled.p`
  font-size: 15px;
  color: ${({theme}) =>  theme.color};
  margin-bottom: 30px;
`


const PasswordResetRequest: React.FC = () => {
  const {themeMode}= useContext(ThemeContext);
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useContext(ErrorPopUpContext);
  const [isSent, setIsSent] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
    } = useForm({
      defaultValues: {
        email: "",
      }
  });

  const sendEmail = (data: { email: string}): void => {
    const { email } = data;
    axios.post(`${config.serverUrl}users/forgotPassword`, { 
      login: email,
    }, { withCredentials: true })
    .then(res => {
      console.log(res);
      const status: number = res.status;
      if(status === 200){
        setIsSent(true);
      }

    }).catch(err => {
      console.log(err);
      const status: number = err.response.status;
      if(status === 404){
        setErrorMessage(`No users found registered with ${data.email}`);
        setErrorPopUpIsOpen(true);
      } else {
        setErrorMessage(`Something went wrong:( Please try later. We will sort the problem out!`);
        setErrorPopUpIsOpen(true);
      }
    })
  }
  
  if(isSent){
    return(
      <MainContainer>
        We have sent you a password reset link to your email.
        <br />
        Please check your inbox.
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      <ResetPasswordForm
        onSubmit={handleSubmit((data: any) => {
          sendEmail(data);
        })}
      >
        <ResetPasswordMessage>To reset your password, provide your email and we'll send you an email with instructions.</ResetPasswordMessage>
        <InputBox>
          <ErrorMessage>{errors.email ? errors.email.message : ''}</ErrorMessage>
          <FormInput 
            style={{
              transition: 'all 0.3s linear' 
            }}
            placeholder='E-mail...'
            {...register('email', {
              required: {
                value: true,
                message: 'Please put in your email'
              },
              pattern: {
                value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                message: 'Please provide a valid email address'
              }
            })}
          />
          <EmailIcon style={{
            color: `${themeMode.iconColor}`,
            top: '4px',
            left: '5px',
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

export default PasswordResetRequest;