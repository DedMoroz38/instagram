import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { 
  InputBox,
  FormInput,
  VisabilityToggleBox,
  ButtonBox,
  SubmitButton,
  ErrorMessage,
  RedirectLink,
  CircularProgressContainer
 } from '../Login/LoginPresentational';
import { FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import { Theme } from '../../components/Theme/Themes';
import AuthorizationForm from '../../components/AuthorizationForm';


interface Registration {
  showPassword: boolean,
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
  signUp: (data: {
    fullName: string;
    userName: string;
    email: string;
    password: string;
  }) => void,
  register: UseFormRegister<{
    fullName: string;
    userName: string;
    email: string;
    password: string;
  }>,
  handleSubmit: UseFormHandleSubmit<{
    fullName: string;
    userName: string;
    email: string;
    password: string;
  }>,
  errors: FieldErrorsImpl<{
    fullName: string;
    userName: string;
    email: string;
    password: string;
  }>,
  isError: boolean,
  loading: boolean,
  themeMode: Theme
}

const RegistrationPresentational: React.FC<Registration> = ({
  showPassword,
  setShowPassword,
  signUp,
  register,
  handleSubmit,
  errors,
  isError,
  loading,
  themeMode
}) =>  {

  return (
    <AuthorizationForm 
      isError={isError}
      handleSubmit={handleSubmit}
      authFunction={signUp}
      name={'Registration'}
    >
      <>
        <InputBox>
          <ErrorMessage>{errors.fullName ? errors.fullName.message : ''}</ErrorMessage>
          <FormInput
            placeholder='Full Name'
            {...register('fullName', {
              required: {
                value: true,
                message: 'Provide your full name'
              }
            })}
          />
          <PersonIcon style={{
            top: '4px',
            left: '5px',
            color: `${themeMode.iconColor}`,
            position: 'absolute'}} 
          />
        </InputBox>
        <InputBox>
          <ErrorMessage>{errors.userName ? errors.userName.message : ''}</ErrorMessage>
          <FormInput
            placeholder='Username'
            {...register('userName', {
              required: {
                value: true,
                message: 'Come up with an username'
              },
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: 'Please use only alphanumeric characters'
              },
            })}
          />
          <InsertEmoticonIcon style={{
            top: '4px',
            left: '5px',
            color: `${themeMode.iconColor}`,
            position: 'absolute'}} 
          />
        </InputBox>
        <InputBox>
          <ErrorMessage>{errors.email ? errors.email.message : ''}</ErrorMessage>
          <FormInput
            placeholder='E-mail'
            {...register('email', {
              required: {
                value: true,
                message: 'Put in your email'
              },
              pattern: {
                value: /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/,
                message: 'Please provide a valid email address'
              }
            })}
          />
          <EmailIcon style={{
            top: '4px',
            left: '5px',
            color: `${themeMode.iconColor}`,
            position: 'absolute'}} 
          />
        </InputBox>
        <InputBox>
          <ErrorMessage>{errors.password ? errors.password.message : ''}</ErrorMessage>
          <FormInput
            placeholder='Password'
            type={showPassword ? 'text' : "password"} 
            {...register('password', {
              required: {
                value: true,
                message: 'Put in your password'
              },
              minLength: {
                value: 8,
                message: 'At least 8 characters is required'
              }
            })}
          />
          <LockIcon style={{
            top: '4px',
            left: '5px',
            color: `${themeMode.iconColor}`,
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
        </InputBox>
        <ButtonBox>
          <RedirectLink 
            to="/signin"
          >Go to login</RedirectLink>
          {
            loading ? 
            <CircularProgressContainer>
              <CircularProgress style={{
                margin: '0 auto',
                color: 'white',
                height: '30px',
                width: '30px'
              }} />
            </CircularProgressContainer> :
            <SubmitButton 
              value="Register"
            />
          }
        </ButtonBox>
      </>
    </AuthorizationForm>
  )
}

export default RegistrationPresentational;
