import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
 } from '../Login/LoginPresentational';
import { Link } from 'react-router-dom';

interface Registration {
  showPopup: boolean,
  FullName: React.RefObject<HTMLInputElement>,
  EmailInput: React.RefObject<HTMLInputElement>,
  PasswordInput: React.RefObject<HTMLInputElement>,
  showPassword: boolean,
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
  UserName: React.RefObject<HTMLInputElement>,
  register: () => void
}

const RegistrationPresentational: React.FC<Registration> = ({
  showPopup,
  FullName,
  EmailInput,
  PasswordInput,
  showPassword,
  setShowPassword,
  UserName,
  register
}) =>  {

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

export default RegistrationPresentational;