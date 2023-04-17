import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import Emoji from '../Emoji/EmojiPicker';
import { LikeButton, LikeContainer, NumberOfLikes } from '../Post';
import SendIcon from '@mui/icons-material/Send';
import { LikeBorderIcon, LikeIcon } from '../StyledIcons';
import { Scrollbar } from '../Theme/globalStyles';
import { useWidthContext } from '../../ContextProviders/WidthProivder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';

const LikesContainer = styled.div`
  height: 30px;
  display: flex;
  justify-content: end;
  align-items: center;
  @media (max-width: 420px){
    height: 40px;
  }
`


const InputContainer = styled.div`
  transition: all 0.3s linear;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-top: 1px solid #96989d;
  padding: 5px;
  color: ${({ theme }) => theme.iconColor};
  @media (max-width: 420px){
    height: 60px;
    // position: fixed;
    // bottom: -96vh;
  }
`;

const CommentInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  margin: 0 5px;
  font-size: 15px;
  color: ${({ theme }) => theme.color};
  &::placeholder {
    padding-left: 5px;
  }
`;

const SendCommentButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.iconColor};
`;

const Block = styled.div`
  border-radius: 0 0 10px 10px;
  grid-area: comments;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.messageBoxBackground};
  max-height: calc(90vh - 50px);
  @media (max-width: 420px){
    border-radius: 0;
    ${props => props.isOpen ? 
      `
      position: fixed;
      top: -50px;
      width: 100vw;
      height: 100vh;
      max-height: none;`
      : ``}
  }
`;

const PostCommentsContianer = styled(Scrollbar)`
  overflow-y: scroll;
  padding: 10px;
  @media (max-width: 420px){
    position: relative;
    padding: 20px 0 0 20px;
  }
`;
const CommentBox = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const CommentCreatorPhoto = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const CommentTextContianer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-left: 10px;
`;

const CommentCreator = styled.p`
  color: ${({theme}) => theme.color};
  font-weight: 600;
`;
const Comment = styled.p`
  color: ${({theme}) => theme.color};
  font-weight: 400;
  margin-left: 3px;
`;

const CloseButton = styled(CloseIcon)`
  right: 20px;
  top: 20px;
  position: absolute;
  color: ${({theme}) => theme.color};
  height: 30px !important;
  width: 30px !important;
`

const Comments = ({
  comments,
  listOfIdsOfLikedPosts,
  like,
  numberOfLikes,
  postId,
  sendComment,
  handleKeypress,
  inputRef,
  commentProp
}) => {
  const {isCommentOpen, setCommentOpen} = commentProp;
  const {isMobile} = useWidthContext();

  return (
    <Block
      isOpen={isCommentOpen}
    >
      <PostCommentsContianer>
        {
          (isMobile || isCommentOpen) ?
          <CloseButton onClick={() => setCommentOpen(false)} /> :
          null
        }
        { 
          (!isMobile || isCommentOpen) ?
          comments.map((comment, index) => (
            <CommentBox key={index}>
              <CommentCreatorPhoto 
                src={`${process.env.REACT_APP_IMAGES_URL}users/${comment[2]}`} 
                alt="post creator" 
              />
              <CommentTextContianer>
                <CommentCreator>{comment[1]}</CommentCreator>
                <Comment>{comment[0]}</Comment>
              </CommentTextContianer>
            </CommentBox>
          )) :
          null
        }
      </PostCommentsContianer>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <LikesContainer>
          {
            isMobile &&
            <ChatBubbleOutlineIcon 
              onClick={() => setCommentOpen(!isCommentOpen)}
              style={{
                position: 'absolute',
                right: '60px',
                color: 'white'
              }}
            />
          }
          <LikeContainer>
            <NumberOfLikes>{numberOfLikes[`${postId}`]}</NumberOfLikes>
            <LikeButton onClick={() => like()}>
              {
                listOfIdsOfLikedPosts.includes(postId) ?
                <LikeIcon dimensions="24px" /> :
                <LikeBorderIcon dimensions="24px" />
              }
            </LikeButton>
          </LikeContainer>
        </LikesContainer>
        {
          (!isMobile || isCommentOpen) ?
          <InputContainer>
            <Emoji 
              messagesInput={inputRef}
            />
            <CommentInput
              placeholder='Add a comment...'
              ref={inputRef}
              onKeyPress={handleKeypress}
            />
            <SendCommentButton
              onClick={() => sendComment()}
            >
              <SendIcon />
            </SendCommentButton>
          </InputContainer> 
          :
          null
        }
      </div>
    </Block>
  )
}

export default Comments;