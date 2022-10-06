import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import NewImagesSwiper from './NewImagesSwiper';
import axios from 'axios';
import config from "../../config.json";
import { ModalContext } from '../Dashboard';

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
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalContainer = styled.div`
  height: 75vh;
  width: 35vw;
  background: ${({ theme }) => theme.background};
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




const ModalToAddPost: React.FC<{
  onClose: () => void
}> = ({
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
    const attachmentsForm = new FormData();

    for(let file of post){
      attachmentsForm.append('images', file);
    }

    axios.post(`${config.serverUrl}posts`,
      attachmentsForm,
      { withCredentials: true }
    )
    .then(res => {
      onClose();
      // TODO - create a tick: "File load subbmition"
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
  }, [newPostImages, modalButtonFlug]);


  return (
    <MainContainer>
      <ModalContainer>
        <ModalCaption>Create new post</ModalCaption>
        <NewImagesSwiper 
          postImages={newPostImages}
        />
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
  )
}

export default ModalToAddPost;
