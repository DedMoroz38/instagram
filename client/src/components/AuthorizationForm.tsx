import { DetailedHTMLProps, HTMLAttributes, RefObject } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import styled, { keyframes, ThemedStyledProps } from "styled-components";

const MainContainer = styled.div`
position: relative;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
`;

export const shadowAnimation = (props: ThemedStyledProps<Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof HTMLAttributes<HTMLDivElement>> & { ref?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined; } & object, any>) => keyframes`
  50% {
    box-shadow: ${props.theme.shadow} 0px 10px 30px;
  }
`;

const SignBox = styled.div`
  background: ${({ theme }) => theme.background};
  height: 500px;
  width: 400px;
  border-radius: 15px 130px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${props => shadowAnimation(props)} 4s infinite alternate;
  @media (max-width: 420px){
    width: calc(100vw - 40px);
  }
`;

const SignForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 400px;
  width: 300px;
`;

const FormHeding = styled.h1`
  color: ${({ theme }) => theme.color};
  opacity: 0.7;
  font-size: 38px;
`;

interface AuthorizationForm {
  children: JSX.Element,
  isError: boolean,
  handleSubmit: UseFormHandleSubmit<{
    fullName: string;
    userName: string;
    email: string;
    password: string;
  } | {
    email: string;
    password: string;
  }>
  authFunction: any,
  name: string
}

const AuthorizationForm: React.FC<AuthorizationForm> = ({children, isError, handleSubmit, authFunction, name}) => {
  return (
    <MainContainer>
      <SignBox
        style={isError ?
          {
            boxShadow: "#ff0033 0px 10px 30px",
            animationName: 'none'
          } :
          {}}
      >
        <SignForm onSubmit={handleSubmit((data: any) => {
          authFunction(data);
        })}
        >
          <FormHeding>{name}</FormHeding>
          {children}
        </SignForm>
      </SignBox>
    </MainContainer>
  )
}

export default AuthorizationForm;