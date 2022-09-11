import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ReactDOM from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import ImagesSwiper from './ImagesSwiper';
import axios from 'axios';
import config from "../config.json";

export const blurAnimation = keyframes`
  0% {
    backdrop-filter: blur(0px);
    background-color: rgba(0, 0, 0, 0);
  } 100% {
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, .5);
  }
`;

const MainContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BackgoundBlur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${blurAnimation} 0.2s;
  animation-fill-mode: forwards; 
`;

const CloseModalButton = styled.div`
  color: white;
  position: fixed;
  top: 20px;
  right: 20px;
  cursor: pointer;
`

const ModalContainer = styled.div`
  height: 75vh;
  width: 35vw;
  background: black;
  border-radius: 20px;
  box-shadow: #ba8fff 0px 0px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const ModalCaption = styled.h2`
  color: white
`;

const AddPostButton = styled.label`
  color: white;
  border: 1px solid grey;
  padding: 2px 5px;
  border-radius: 4px;
`;



interface Modal{
  isOpen: boolean,
  onClose: () => void
}

const ModalToAddPost: React.FC<Modal> = ({
  isOpen,
  onClose
}) => {

  const [newPostImages, setNewPostImages] = useState<Array<string>>([]);
  const [modalButtonFlug, setModalButtonFlug] = useState<boolean>(true);
  const [post, setPost] = useState<Array<string>>([]);


  const createNewPost = (event: any): void => {
    const images = event.target.files;
    setPost(images);

    for (let i = 0; i < images.length; i++) {
      setNewPostImages(prev => [...prev, URL.createObjectURL(images[i])]);
      // TODO - make only one array loop
    }

    setModalButtonFlug(false);
  }

  const publishPost = (): void => {
    const form = new FormData();

    for(let file of post){
      form.append('images', file);
    }

    axios.post(`${config.serverUrl}posts`,
      form,
      { withCredentials: true }
    )
    .then(res => {
      onClose();
      // TODO - create a tick "File load subbmition"
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
  }, [newPostImages, modalButtonFlug]);

  if(!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <BackgoundBlur />
      <CloseModalButton onClick={onClose}>
        <CloseIcon />
      </CloseModalButton>
      <MainContainer>
        <ModalContainer>
          <ModalCaption>Create new post</ModalCaption>
          <ImagesSwiper newPostImages={newPostImages} />
          { 
            modalButtonFlug ?
            <AddPostButton htmlFor='addPost'>Create new post</AddPostButton> :
            <AddPostButton onClick={() => publishPost()}>Publish</AddPostButton> 
          }
          <input 
            style={{display: "none"}}
            onChange={createNewPost}
            multiple
            accept='image/*'
            type='file'
            id='addPost'
          />
        </ModalContainer>
      </MainContainer>
    </>,
    document.getElementById('portal')!
  )
}

export default ModalToAddPost;
