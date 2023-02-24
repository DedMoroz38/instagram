import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import NewImagesSwiper from './NewImagesSwiper';
import axios from 'axios';
import config from "../../config.json";
import { CircularLoaidng } from '../StyledIcons';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ModalWindow from '../ModalWindow/ModalWindow';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
  height 35vw;
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
  color: ${({theme}) => theme.color};
`;

const AddPostButton = styled.label`
  color: ${({theme}) => theme.color};
  border: 1px solid grey;
  padding: 2px 5px;
  border-radius: 4px;
  cursor: pointer;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddFileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddFileIcon = styled(AddPhotoAlternateIcon)`
  width: 80px !important;
  height: 80px !important;
  color: ${({theme}) => theme.color};
`;

const AddFileHeading = styled.p`
  color: ${({theme}) => theme.color};
`

const CloseModalButton = styled.div`
  z-index: 1;
  color: white;
  position: fixed;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;


const ModalToAddPostComponent: React.FC<{
  onClose: () => void
}> = ({
  onClose
}) => {

  const [newPostImages, setNewPostImages] = useState<Array<string>>([]);
  const [modalButtonFlug, setModalButtonFlug] = useState<boolean>(true);
  const [post, setPost] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const [unsupportedFileError, setUsupportedFileError] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const createNewPost = (event: any): void => {
    const files = event.target.files;
    setPost(files);

    for (let i = 0; i < files.length; i++) {
      setNewPostImages(prev => [...prev, URL.createObjectURL(files[i])]);
    }

    setModalButtonFlug(false);
  }

  const handleDragOver = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if(!isDragOver){
      setIsDragOver(true)
    }
  }

  const handleDrop = (event: {
    dataTransfer: any; 
    preventDefault: () => void; 
  }) => {
    event.preventDefault();
    setIsDragOver(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if(files[i].type.startsWith("image/")){
        setNewPostImages(prev => [...prev, URL.createObjectURL(files[i])]);
      } else {
        setUsupportedFileError(true);
        setNewPostImages([]);
        break;
      }
    }
    setModalButtonFlug(false);
  }

  const publishPost = (): void => {
    setLoading(true);
    const attachmentsForm = new FormData();

    for(let file of post){
      attachmentsForm.append('images', file);
    }

    axios.post(`${config.serverUrl}posts`,
      attachmentsForm,
      { withCredentials: true }
    )
    .then(res => {
      setLoading(false);
      onClose();
      // TODO - create a tick: "File load subbmition"
    })
    .catch(err => {
      setLoading(false);
      console.log(err);
    })
  }

  useEffect(() => {
  }, [newPostImages, modalButtonFlug]);

  return (
    <MainContainer
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ModalContainer>
        <ModalCaption>Create new post</ModalCaption>
        {newPostImages.length === 0 ?
          <AddFileContainer>
            <AddFileIcon style={{color: `${isDragOver ? '#ba8fff': 'white'}`}} />
            <AddFileHeading style={{color: `${isDragOver ? '#ba8fff': 'white'}`}}>Drag photos and videos here</AddFileHeading>
          </AddFileContainer> :
          <NewImagesSwiper 
            postImages={newPostImages}
          />
        }
        { 
          modalButtonFlug ?
          <AddPostButton htmlFor='addPost'>Select from computer</AddPostButton> :
          loading ?
          <CircularLoaidng dimensions={'30px'} /> :
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

const ModalToAddPost: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <AddCircleOutlineIcon style={{cursor: 'pointer'}}
        onClick={() => setIsOpen(true)}
      />
      {
        isOpen ?
        <ModalWindow onClose={() => setIsOpen(false)}>
          <ModalToAddPostComponent onClose={() => setIsOpen(false)} />
        </ModalWindow> :
        null
      }
    </>
  )
}

export default ModalToAddPost;
