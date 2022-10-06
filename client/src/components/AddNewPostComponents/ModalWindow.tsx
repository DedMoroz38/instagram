import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ReactDOM from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import { ModalContext } from '../Dashboard';

const blurAnimation = keyframes`
  0% {
    backdrop-filter: blur(0px);
    background-color: rgba(0, 0, 0, 0);
  } 100% {
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, .5);
  }
`;


export const BackgoundBlur = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${blurAnimation} 0.2s;
  animation-fill-mode: forwards; 
`;

export const CloseModalButton = styled.div`
  z-index: 1;
  color: white;
  position: fixed;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;


interface Modal{
  isOpen: boolean,
  onClose: () => void,
  children: JSX.Element
}


const ModalWindow: React.FC<Modal> = ({
  isOpen,
  onClose,
  children
}) => {

  if(!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <BackgoundBlur />
      <CloseModalButton onClick={onClose}>
        <CloseIcon />
      </CloseModalButton>
      {children}
    </>,
    document.getElementById('portal')!
  )
}

export default ModalWindow;
