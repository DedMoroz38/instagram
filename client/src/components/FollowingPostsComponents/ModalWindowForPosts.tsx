import styled from 'styled-components';
import FollowingPostsSwiper from './FollowingPostsSwiper';
import { useContext, useEffect, useState } from 'react';
import { ModalWindowContext } from '../../routes/Main/MainContainer';
import config from "../../config.json";
import axios from 'axios';
import PostInfoComponent from './PostInfoComponent';
import ModalWindow from '../ModalWindow/ModalWindow';

const MainContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.messageBoxBackground};
  border-radius: 20px;
`;


const ModalWindowForPostsComponent: React.FC = ({
}) => {
  const {
    postIdForModal,
    isOpen,
    onClose
  } = useContext(ModalWindowContext);
  const [postAttachments, setPostAttachments] = useState([]);

  useEffect(() => { 
    if(postIdForModal === 0) return;
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

  return (
    <MainContainer>
      <FollowingPostsSwiper
        postAttachments={postAttachments}
      />
      <PostInfoComponent
        postId={postIdForModal}
      />
    </MainContainer>
  )
}

const ModalWindowForPosts: React.FC = () => {
  const {
    isOpen,
    onClose
  } = useContext(ModalWindowContext);

  if(!isOpen) return null;

  return (
    <ModalWindow onClose={() => onClose()}>
      <ModalWindowForPostsComponent />
    </ModalWindow>
  )
}

export default ModalWindowForPosts;