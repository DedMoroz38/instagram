import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { createUser } from '../../features/user/userSlice';
import RegistrationPresentational from './RegistrationPresentational';

import axios from 'axios';
import { useNavigate } from "react-router";
import config from '../../config.json';

const RegistrationContainer: React.FC = () =>  {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const EmailInput = useRef<HTMLInputElement>(null);
  const FullName = useRef<HTMLInputElement>(null);
  const UserName = useRef<HTMLInputElement>(null);
  const PasswordInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const validate = (): boolean => {
    if (PasswordInput.current!.value.length >= 8) {
      return true;
    }
    setShowPopup(true);
    return false;
  }

  const register = (): void => {
    if(validate()) {
      axios.post(`${config.serverUrl}users/signup`, { 
        full_name: FullName.current?.value,
        user_name: UserName.current?.value,
        login: EmailInput.current?.value,
        password: PasswordInput.current?.value,
      }, { withCredentials: true })
      .then(res => {
        console.log(res);
        dispatch(createUser(res.data.user));
        if(res.status === 201){
          navigate('/');
        }
      })
      .catch(err => {
        setShowPopup(true);
        console.log(err);
      });
    }
  }

  return (
    <RegistrationPresentational 
      showPopup={showPopup}
      FullName={FullName}
      EmailInput={EmailInput}
      PasswordInput={PasswordInput}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      UserName={UserName}
      register={register}
     />
  )
}
export default RegistrationContainer;