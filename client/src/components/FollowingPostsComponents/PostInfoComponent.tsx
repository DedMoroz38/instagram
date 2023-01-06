import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { IdentityIcon } from '../StyledIcons';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import Emoji from '../Emoji/EmojiPicker';
import SendIcon from '@mui/icons-material/Send';
import { useAppSelector } from '../../app/hooks';

const MainContainer = styled.div`
  width: 300px;
  heigth: 100%;
  border-left: 1px solid black;
`;

const PostCreatorInfoContainer = styled.div`
  height: 50px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 5px;
`;

const PostCreator = styled.p`
  color: ${({theme}) => theme.color };
  margin-left: 5px;
`;

const PostCommentsContianer = styled.div`
  height: calc(100% - 130px);
  padding: 15px 5px 0;
  overflow-y: scroll;
  flex-shrink: 0;
`;
const CommentBox = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const CommentCreatorPhoto = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 18px;
`;

const CommentTextContianer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const CommentCreator = styled.p`
  color: ${({theme}) => theme.color}
`;
const Comment = styled.p`
  color: ${({theme}) => theme.color};
  font-weight: 200;
`;

const LikesContainer = styled.div`
  height: 40px;
  border-top: 1px solid black;
`

const LikesBox = styled.div`

`;

const InputContainer = styled.div`
  transition: all 0.3s linear;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-bottom: 20px;
  border-top: 1px solid black;
  padding: 5px;
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
  alifn-items: center;
  justify-conter: center;
  border: none;
  background: transparent;
`;

interface PostInfo {
  postId: number
}

const PostInfoComponent: React.FC<PostInfo> = ({
  postId
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const userInfo = useAppSelector(state => state.userInfo);
  const [comments, setComments] = useState<Array<{
    user_id: number,
    user_name: string,
    photo: string | null,
    comment_id: number | null,
    comment: string,
  }>>([]);

  const like = (postId: number) => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}posts/like/${postId}`,
      { withCredentials: true }
    )
    .then(res => {
    }).catch(err => {
      console.log(err);
    })
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
        setComments(prev => [...prev, {
          user_id: userInfo.id,
          user_name: userInfo.name,
          photo: userInfo.photo,
          comment_id: null,
          comment: comment,
        }])
      }).catch(err => {
        console.log(err);
      })
    }
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}posts/comment/${postId}`,
      { withCredentials: true }
    )
    .then(res => {
      setComments([...res.data.comments]);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <MainContainer>
      <PostCreatorInfoContainer>
        <IdentityIcon dimensions={'40px'} />
        <PostCreator>Name</PostCreator>
      </PostCreatorInfoContainer>
      <PostCommentsContianer>
      {
        comments.map((comment, index) => (
          <CommentBox key={index}>
            <CommentCreatorPhoto 
              src={`${process.env.REACT_APP_FILES_URL}/users/${comment.photo}`} 
              alt="post creator" 
            />
            <CommentTextContianer>
              <CommentCreator>{comment.user_name}</CommentCreator>
              <Comment>{comment.comment}</Comment>
            </CommentTextContianer>
          </CommentBox>
        ))
      }
      </PostCommentsContianer>
      <LikesContainer>
        <LikesBox>
          <FavoriteBorderIcon onClick={() => like(postId)} />
        </LikesBox>
      </LikesContainer>
      <InputContainer>
        <Emoji 
          messagesInput={inputRef}
        />
        <CommentInput
          placeholder='Add a comment...'
          ref={inputRef}
        />
        <SendCommentButton
          onClick={() => sendComment()}
        >
          <SendIcon />
        </SendCommentButton>
      </InputContainer>
    </MainContainer>
  )
}

export default PostInfoComponent;