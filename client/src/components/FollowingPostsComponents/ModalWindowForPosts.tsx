import styled, { keyframes } from 'styled-components';
import FollowingPostsSwiper from './FollowingPostsSwiper';
import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ModalWindowContext } from '../../routes/Main/MainContainer';
import config from "../../config.json";
import axios from 'axios';
import PostInfoComponent from './PostInfoComponent';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useWatch } from 'react-hook-form';
import { ContactsOutlined } from '@mui/icons-material';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { findDOMNode } from 'react-dom';
import { Errors } from '../../lib/errors/Errors';
import { useErrorPopUpContext } from '../../ContextProviders/ClienErrorHandlingProvider';

const slideIn = keyframes`
  0% {
    -webkit-transform: translateZ(-1400px) translateY(800px);
            transform: translateZ(-1400px) translateY(800px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0) translateY(0);
            transform: translateZ(0) translateY(0);
    opacity: 1;
  }
`
const MainContainer = styled.div`
  border-radius: 10px;
  display: grid;
  grid-template-columns: 65vw 300px;
  grid-template-rows: [row1-start] 50px [row1-end row2-start];
  animation: ${slideIn} 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  grid-template-areas:
    "post name"
    "post comments";
    

  @media (max-width: 420px){
    border-radius: 0;
    grid-template-columns: 100vw;
    grid-template-rows: 50px min-content min-content;
    grid-template-areas:
      "name"
      "post"
      "comments";
  }
`;


const ModalWindowForPostsComponent: React.FC<{modalProp: any, likingProp: any, commentProp: any}> = ({
  modalProp,
  likingProp,
  commentProp
}) => {
  const {
    postIdForModal,
    onClose
  } = modalProp;
  const boxRef = useRef<HTMLDivElement>();
  const [postAttachments, setPostAttachments] = useState([]);
  const [comments, setComments] = useState([]);
  const [userInfo, setUserInfo] = useState('');
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();
  useOutsideAlerter(boxRef, onClose);

  useEffect(() => { 
    if(postIdForModal === 0) return;
    axios.get(`${process.env.REACT_APP_SERVER_URL}posts/getAttachmentsForPost/${postIdForModal}`,
      { withCredentials: true }
    )
    .then(res => {
      const data = res.data;
      setUserInfo(data.userName);
      setComments(data.postComments);
      setPostAttachments(data.postAttachments);
    })
    .catch(err => {
      setErrorMessage(Errors.default);
      setErrorPopUpIsOpen(true);
    });
  }, [postIdForModal]);


  return (
    <MainContainer ref={boxRef}>
      <FollowingPostsSwiper
        isCommentOpen={commentProp.isCommentOpen}
        postAttachments={postAttachments}
      />
      <PostInfoComponent
        commentProp={commentProp}
        likingProp={likingProp}
        userInfo={userInfo}
        postId={postIdForModal}
        comments={comments}
        setComments={setComments}
      />
    </MainContainer>
  )
}

const ModalWindowForPosts: React.FC<{modalProp: any, likingProp: any}> = ({modalProp, likingProp}) => {
  const {
    isOpen,
    onClose
  } = modalProp;




  if(!isOpen) return null;

  const [isCommentOpen, setCommentOpen] = useState(false);

  return (
    <ModalWindow 
      onClose={() => onClose()}
      extraStyles={isCommentOpen ? `
        top: 0;
        transform: translate(-50%,0);
      ` : ''}
    >
      <ModalWindowForPostsComponent 
        modalProp={modalProp}
        likingProp={likingProp}
        commentProp={{isCommentOpen, setCommentOpen}}
      />
    </ModalWindow>
  )
}

export default ModalWindowForPosts;


