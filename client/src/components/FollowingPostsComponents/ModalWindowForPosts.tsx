import {BackgoundBlur, CloseModalButton} from '../AddNewPostComponents/ModalWindow';
import CloseIcon from '@mui/icons-material/Close';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import FollowingPostsSwiper from './FollowingPostsSwiper';
import { useContext, useEffect, useState } from 'react';
import { ModalWindowContext } from '../../routes/Main/MainContainer';
import config from "../../config.json";
import axios from 'axios';

const MainContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  border: 1px solid red;
  display: flex;
`;

const PostInfoContainer = styled.div`
  border: 1px solid red;
  width: 300px;
`;

const ModalWindowForPosts: React.FC = ({
}) => {
  const {
    postIdForModal,
    isOpen,
    onClose
  } = useContext(ModalWindowContext);

  const [postAttachments, setPostAttachments] = useState([]);

  useEffect(() => {
    axios.get(`${config.serverUrl}posts/getAttachmentsForPost/${postIdForModal}`,
      { withCredentials: true }
    )
    .then(res => {
      setPostAttachments(res.data.postAttachments);
    })
    .catch(err => {
      console.log(err);
    });
  }, [postIdForModal]);

  console.log(postAttachments);

  if(!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <BackgoundBlur />
      <CloseModalButton onClick={() => onClose()}>
        <CloseIcon />
      </CloseModalButton>
      <MainContainer>
        <FollowingPostsSwiper
          postAttachments={postAttachments}
        />
        <PostInfoContainer>

        </PostInfoContainer>
      </MainContainer>
    </>,
    document.getElementById('portal')!
  )
}

export default ModalWindowForPosts;