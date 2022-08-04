import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config.json';
import axios from 'axios';
import { createUser } from '../features/user/userSlice';
import { useAppDispatch } from '../app/hooks';

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

export const SignForm = styled.div`
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

export const SignInput = styled.input`
  border-radius: 10px 10px 0 0;
  font-size: 16px;
  border: none;
  height: 35px;
  padding-left: 40px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  width: 100%;
  background: ${({ theme }) => theme.background};
  color: white;
  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
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

export const SubmitButon = styled.button`
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

const  Login: React.FC<{}> = () =>  {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const EmailInput = useRef<HTMLInputElement>(null);
  const PasswordInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = () => {
    axios.post(`${config.serverUrl}users/login`, { 
      login: EmailInput.current?.value,
      password: PasswordInput.current?.value,
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

  return (
    <MainContainer>
      <SignBox>
        <SignForm>
          <FormHeding>Login</FormHeding>
          <InputBox>
            <SignInput 
              placeholder='E-mail...'
              ref={EmailInput}
            />
            <EmailIcon style={{
              top: '4px',
              left: '5px',
              position: 'absolute'}} 
            />
          </InputBox>
          <InputBox>
            <SignInput 
              placeholder='Password...'
              type={showPassword ? 'text' : "password"}
              ref={PasswordInput}
            />
            <LockIcon style={{
              top: '4px',
              left: '5px',
              position: 'absolute'}} 
            />
            <VisabilityToggleBox
              onClick={() => { setShowPassword(!showPassword) }}
            >
              {showPassword ? 
              <VisibilityIcon /> : 
              <VisibilityOffIcon />}
            </VisabilityToggleBox>
          </InputBox>
          <ButtonBox>
            <Link 
              to="/signup"
              style={{
                color: "rgb(94, 14, 148)",
                marginLeft: "30px"
              }}
            >Go to registration</Link>
            <SubmitButon onClick={() => login()}>Log in</SubmitButon>
          </ButtonBox>
        </SignForm>
      </SignBox>
    </MainContainer>
  )
}
export default Login;