import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config.json';
import axios from 'axios';
import { createUser } from '../../features/user/userSlice';
import { useAppDispatch } from '../../app/hooks';
import LoginPresentational from './LoginPresentational';


const LoginContainer: React.FC<{}> = () =>  {
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
    <LoginPresentational
      EmailInput={EmailInput}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      PasswordInput={PasswordInput}
      login={login}
    />
  )
}
export default LoginContainer;