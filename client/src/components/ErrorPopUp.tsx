import styled, { keyframes } from "styled-components";
import { useErrorPopUpContext } from "../ContextProviders/ClienErrorHandlingProvider";

export const popupAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;


export const MainContainer = styled.div`
  padding: 10px;
  box-shadow: ${({ theme }) => theme.shadow} 0px 0px 5px;
  border-radius: 5px;
  width: 500px;
  height: 50px;
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.background};
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
  align-items: center;
  justify-content: center;
  display: flex;
  color: ${({ theme }) => theme.color};
  font-weight: 250;
  z-index: 2;
  @media (max-width: 420px){
    width: 300px;
  }
`;

const ErrorPopUp: React.FC = () => {
  const { isOpen, setIsOpen, errorMessage } = useErrorPopUpContext(); 

  if(!isOpen) return null;

  setTimeout(() => {
    setIsOpen(false);
  }, 5000);

  return (
    <MainContainer>
      <p>{errorMessage}</p>
    </MainContainer>
  );
}

export default ErrorPopUp;