import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import config from '../config.json';
import { useErrorPopUpContext } from "../ContextProviders/ClienErrorHandlingProvider";
import { useResendEmialConfirmation } from "../hooks/fetchHooks/authorization/useResendEmialConfirmation";



const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: #ba8fff 0px 10px 30px;
  padding: 20px 20px 15px;
  border-radius: 15px;
`;

const EmailConfirmationMessageText = styled.div`
  color: ${({ theme }) => theme.color}; 
  font-size: 15px;
`;

const ResendButton = styled.button`
  color: white;
  border: none;
  background-color: #593d88;
  border-radius: 30px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  margin-top: 35px;
`


type LocationState = {
  state: {
    user: {
      id: number,
      fullName: string,
      login: string,
    };
  }
}

const EmailConfirmation: React.FC = ({
}) => {
  const location = useLocation();
  const { state } = location as LocationState;
  const user = state.user;
  const [send, setSend] = useState<boolean>(false);

  const {loading} = useResendEmialConfirmation(send, user, setSend);

  return (
    <MainContainer>
      <EmailConfirmationMessageText>
        We have sent you an email confirmation link.
        Please check your inbox.
        <br/>
        Didn't receive the email? We will gladly send you another.
      </EmailConfirmationMessageText>
      <ResendButton onClick={() => setSend(true)}>
        Resend Varification Email
      </ResendButton>
    </MainContainer>
    
  )
}

export default EmailConfirmation;