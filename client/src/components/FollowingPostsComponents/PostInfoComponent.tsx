import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { IdentityIcon, LikeBorderIcon, LikeIcon } from '../StyledIcons';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import Emoji from '../Emoji/EmojiPicker';
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LikeButton, LikeContainer, NumberOfLikes } from '../Post';
import { useLike } from '../../lib/likes/like';
import { Scrollbar } from '../Theme/globalStyles';
import Comments from './Comments';
import { useWidthContext } from '../../ContextProviders/WidthProivder';
import ModalWindow from '../ModalWindow/ModalWindow';
import { Errors } from '../../lib/errors/Errors';
import { useErrorPopUpContext } from '../../ContextProviders/ClienErrorHandlingProvider';

const PostCreatorInfoContainer = styled.div`
  border-radius: 10px 10px 0 0;
  background: ${({ theme }) => theme.messageBoxBackground};
  grid-area: name;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 10px;
  border-bottom: 1px solid #96989d;
  @media (max-width: 420px){
    border-radius: 0;
    height: auto;
    ${props => props.isCommentOpen ? 
      `display: none`
       : ``}
  }
`;

const PostCreator = styled.p`
  color: ${({theme}) => theme.color };
  margin-left: 7px;
`;


const CommentCreatorPhoto = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;



interface PostInfo {
  userInfo: any,
  postId: number,
  comments: any,
  setComments: any
  likingProp: any,
  commentProp: any
}

const PostInfoComponent: React.FC<PostInfo> = ({
  userInfo,
  postId,
  comments,
  setComments,
  likingProp,
  commentProp
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userInfo);
  const {likes: listOfIdsOfLikedPosts, numberOfLikes} = useAppSelector(state => state[likingProp.for]);
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();

  const like = () => {
    useLike(postId, likingProp, dispatch, listOfIdsOfLikedPosts);
  }

  const sendComment = () => {
    const comment = inputRef.current!.value.trim();
    if (comment != ""){
      axios.post(`${process.env.REACT_APP_SERVER_URL}posts/comment/${postId}`,{
        comment: comment
      },
        { withCredentials: true }
      )
      .then(res => {
        inputRef.current!.value = '';
        setComments(prev => [...prev, [
          comment,
          user.user_name,
          user.photo
        ]])
      }).catch(err => {
        setErrorMessage(Errors.default);
        setErrorPopUpIsOpen(true);
      })
    }
  }

  const handleKeypress = (e: { key: string; }): void => {
    if (e.key === "Enter") {
      sendComment();
    }
  }

  return (
    <>
      <PostCreatorInfoContainer
        isCommentOpen={commentProp.isCommentOpen}
      >
        {
          userInfo[1] === null ?
          <IdentityIcon dimensions={window.innerWidth <= 420 ? '30px' : '40px'} /> :
          <CommentCreatorPhoto 
            src={`${process.env.REACT_APP_IMAGES_URL}users/${userInfo[1]}`} 
            alt="post creator" 
          />
        }
        <PostCreator>{userInfo[0]}</PostCreator>
      </PostCreatorInfoContainer>
      <Comments
        comments={comments}
        listOfIdsOfLikedPosts={listOfIdsOfLikedPosts}
        like={like}
        numberOfLikes={numberOfLikes}
        postId={postId}
        sendComment={sendComment}
        handleKeypress={handleKeypress}
        inputRef={inputRef}
        commentProp={commentProp}
      /> 
    </>
  )
}

export default PostInfoComponent;


