import React, { useEffect, useRef, useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { createUser } from '../features/user/userSlice';

import { 
  MainContainer,
  SignBox,
  SignForm, 
  FormHeding,
  InputBox,
  SignInput,
  VisabilityToggleBox,
  ButtonBox,
  SubmitButon,
  ErorrPopup
 } from './Login';
import axios from 'axios';
import { useNavigate } from "react-router";
import config from '../config.json';

const Registration: React.FC<{}> = () =>  {
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
    <MainContainer>
      {
        showPopup ?
        <ErorrPopup>Password should conatain at least 8 symbols!</ErorrPopup> :
        null
      }
      <SignBox style={showPopup ? {boxShadow: 'red 0px 10px 30px', animationName: 'none'} : {boxShadow: 'none'}}>
        <SignForm>
          <FormHeding>Registration</FormHeding>
          <InputBox>
            <SignInput
              placeholder='Full Name'
              ref={FullName}
            />
            <PersonIcon style={{
              top: '4px',
              left: '5px',
              color: 'white',
              position: 'absolute'}} 
            />
          </InputBox>
          <InputBox>
            <SignInput
              placeholder='Username'
              ref={UserName}
            />
            <InsertEmoticonIcon style={{
              top: '4px',
              left: '5px',
              color: 'white',
              position: 'absolute'}} 
            />
          </InputBox>
          <InputBox>
            <SignInput
              placeholder='E-mail'
              ref={EmailInput}
            />
            <EmailIcon style={{
              top: '4px',
              left: '5px',
              color: 'white',
              position: 'absolute'}} 
            />
          </InputBox>
          <InputBox>
            <SignInput
              placeholder='Password'
              type={showPassword ? 'text' : "password"} 
              ref={PasswordInput}
            />
            <LockIcon style={{
              top: '4px',
              left: '5px',
              color: 'white',
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
              to="/signin"
              style={{
                color: "rgb(94, 14, 148)",
                marginLeft: "30px"
              }}
            >Go to login</Link>
            <SubmitButon onClick={() => register()}>Register</SubmitButon>
          </ButtonBox>
        </SignForm>
      </SignBox>
    </MainContainer>
  )
}
export default Registration;