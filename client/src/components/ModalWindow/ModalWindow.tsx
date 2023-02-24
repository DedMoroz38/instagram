import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';


const blurAnimation = keyframes`
  0% {
    backdrop-filter: blur(0px);
    background-color: rgba(0, 0, 0, 0);
  } 100% {
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, .5);
  }
`;


const BackgroundBlur = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${blurAnimation} 0.2s;
  animation-fill-mode: forwards; 
`;

const ModalConatiner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const CloseModalButton = styled.div`
  z-index: 2;
  color: white;
  position: fixed;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

interface ModalWindow{
  children: JSX.Element,
  onClose?: () => void
}

const ModalWindow: React.FC<ModalWindow> = ({
  children,
  onClose
}) => {

  return ReactDOM.createPortal(
    <>
      <BackgroundBlur />
      {onClose &&
        <CloseModalButton onClick={() => onClose()}>
          <CloseIcon />
        </CloseModalButton>
      }
      <ModalConatiner>
        {children}
      </ModalConatiner>
    </>,
    document.getElementById('portal')!
  )
}

export default ModalWindow;