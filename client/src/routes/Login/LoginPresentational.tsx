import styled, { keyframes } from "styled-components";
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";
import { FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { useContext } from "react";
import { ThemeContext } from "../../App";

export const MainContainer = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const shadowAnimation = keyframes`
  50% {
    box-shadow: #ba8fff 0px 10px 30px;
  }
`;

export const popupAnimation = keyframes`
  0% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
`;


export const SignBox = styled.div`
  background: ${({ theme }) => theme.background};
  height: 500px;
  width: 400px;
  border-radius: 15px 130px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${shadowAnimation} 4s infinite alternate;
`;

export const SignForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 400px;
  width: 300px;
`;

export const FormHeding = styled.h1`
  color: ${({ theme }) => theme.color};
  opacity: 0.7;
  font-size: 38px;
`;

export const InputBox = styled.div`
  width: 100%;
  position: relative;
`;

export const FormInput = styled.input`
  font-size: 16px;
  border: none;
  height: 35px;
  padding-left: 40px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  width: 100%;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${({ theme }) => theme.color};
    -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.background} inset;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff0033;
  position: absolute;
  font-size: 13px;
  left: 40px;
  top: -10px;
`;

export const VisabilityToggleBox = styled.div`
  cursor: pointer;
  position: absolute;
  top: 4px;
  right: 2px;
  color: rgb(94, 14, 148);
`;

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


export const SubmitButton = styled.input.attrs({ type: 'submit' })`
  color: white;
  border: none;
  background-color: #593d88;
  border-radius: 30px;
  width: 100px;
  height: 40px;
  cursor: pointer;
`;

export const ErorrPopup = styled.div`
  box-shadow: #ba8fff 0px 0px 5px;
  border-radius: 10px;
  width: 500px;
  height: 50px;
  position: absolute;
  top: -30px;
  background: ${({ theme }) => theme.background};
  animation: ${popupAnimation} 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ba8fff;
`;

export const ForgotYourPasswordLink = styled(Link)`
  color: ${({ theme }) => theme.formRedirectButtonColor};
  margin-left: 5px;
  font-size: 11px;
`

export const RedirectLink = styled(Link)`
  color: ${({ theme }) => theme.formRedirectButtonColor};
  margin-left: 30px;
  font-size: 15px
`;

export const CircularProgressContainer = styled.div`
  color: white;
  background-color: #593d88;
  border-radius: 30px;
  width: 100px;
  height: 40px;
  display: flex;
  justify-conternt: center;
  align-items: center;
`;

interface Login {
  showPassword: boolean,
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
  loginFn: (data: {
    email: string;
    password: string;
  }) => void,
  register: UseFormRegister<{
    email: string;
    password: string;
}>,
  handleSubmit: UseFormHandleSubmit<{
    email: string;
    password: string;
}>,
  isError: boolean,
  errors: FieldErrorsImpl<{
    email: string;
    password: string;
  }>
}

const LoginPresentational: React.FC<Login> = ({
  showPassword,
  setShowPassword,
  loginFn,
  register,
  handleSubmit,
  isError,
  errors
}) =>  {
  const {themeMode}= useContext(ThemeContext);

  return (
    <MainContainer>
      <SignBox
        style={
          isError ? 
          {
            boxShadow: "#ff0033 0px 10px 30px",
            animationName: 'none'
          } :
          {}
        }
      >
        <SignForm onSubmit={handleSubmit((data: any) => {
            loginFn(data);
          })}
        >
          <FormHeding>Login</FormHeding>
          <InputBox>
            <ErrorMessage>{errors.email ? errors.email.message : ''}</ErrorMessage>
            <FormInput 
              placeholder='E-mail...'
              {...register('email', {
                required: {
                  value: true,
                  message: 'Please put in your email'
                },
                pattern: {
                  value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                  message: 'Please provide a valid email address'
                },
                minLength: 8
              })}
            />
            <EmailIcon style={{
              color: `${themeMode.iconColor}`,
              top: '4px',
              left: '5px',
              position: 'absolute'}} 
            />
          </InputBox>
          <InputBox>
            <ErrorMessage>{errors.password ? errors.password.message : ''}</ErrorMessage>
            <FormInput 
              placeholder='Password...'
              type={showPassword ? 'text' : "password"}
              {...register('password', {
                required: {
                  value: true,
                  message: 'Please put in your password'
                },
                minLength: {
                  value: 8,
                  message: 'Password must contain at least 8 characters'
                }
              })}
            />
            <LockIcon style={{
              color: `${themeMode.iconColor}`,
              top: '4px',
              left: '5px',
              position: 'absolute'}} 
            />
            <VisabilityToggleBox
              style={{
                color: `${themeMode.iconColor}`,
              }}
              onClick={() => { setShowPassword(!showPassword) }}
            >
              {showPassword ? 
              <VisibilityIcon /> : 
              <VisibilityOffIcon />}
            </VisabilityToggleBox>
            <ForgotYourPasswordLink
              to="/passwordreset"
            >Forgot your password?</ForgotYourPasswordLink>
          </InputBox>
          <ButtonBox>
            <RedirectLink 
              to="/signup"
            >Go to registration
            </RedirectLink>
            <SubmitButton 
              value="Log in"
            />
          </ButtonBox>
        </SignForm>
      </SignBox>
    </MainContainer>
  )
}

export default LoginPresentational;