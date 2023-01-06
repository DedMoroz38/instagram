import { useContext } from "react";
import styled from "styled-components";
import config from "../config.json";
import { ModalWindowContext } from "../routes/Main/MainContainer";
import { IdentityIcon, LikeBorderIcon, LikeIcon } from "./StyledIcons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import axios from "axios";
import { removeLike, addLike } from "../features/posts/followingsPostsSlice";


const PostContainer = styled.div`
  width: 236px;
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
  cursor: pointer;
`;

const PostImage = styled.img`
  transition: all 0.2s;
  width: 100%;
  border-radius: 20px;
  transition: all 0.3s;
  &:hover {
    filter: brightness(0.6);
  }
`;

const PostOwnerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  padding-left: 10px;
  position: relative;
`;
const PostOwnerPhoto = styled.img`
  width: 32px;
  border-radius: 50%;
  margin-right: 10px;
`;
const PostOwnerUsername = styled.p`
  color: ${({theme}) => theme.color};
  font-weight: 100;
  margin-left: 10px;
`;

const LikeButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  cursor: pointer;
  border: none;
  position: absolute;
  right: 10px;
`;  

interface Post{
  userName: string,
  postId: number,
  firstAttachment: {
    attachmentId: number;
    postId: number;
    firstPostAttachment: string;
    userPhoto: string;
  },
}


const Post: React.FC<Post> = ({
  userName,
  postId,
  firstAttachment,
}) =>  {
  const listOfIdsOfLikedPosts = useAppSelector(state => state.followingsPosts).likes;
  const dispatch = useAppDispatch();
  const {
    setPostIdForModal,
    setIsOpen,
  } = useContext(ModalWindowContext);

  const openModal = () => {
    setPostIdForModal(postId);
    setIsOpen(true);
  }

  const like = (postId: number) => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}posts/like/${postId}`,
      { withCredentials: true }
    )
    .then(res => {
      if(listOfIdsOfLikedPosts.includes(postId)){
        const postIdIndex = listOfIdsOfLikedPosts.indexOf(postId);
        dispatch(removeLike(postIdIndex));
      } else {
        dispatch(addLike(postId));
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <PostContainer key={postId}>
      <PostImage 
        onClick={() => openModal()}
        src={`${config.serverFilesUrl}postImages/${firstAttachment.firstPostAttachment}`} 
        alt="postsAttachment" 
      />
      <PostOwnerInfo>
        {
          firstAttachment.userPhoto !== null ?
          <PostOwnerPhoto
            src={`${config.serverFilesUrl}users/${firstAttachment.userPhoto}`}
            alt="owners photo"
          /> :
          <IdentityIcon dimensions="30px" />
        }
        <PostOwnerUsername>{userName}</PostOwnerUsername>
        <LikeButton onClick={() => like(postId)}>
        {
          listOfIdsOfLikedPosts.includes(postId) ?
          <LikeIcon dimensions="24px" /> :
          <LikeBorderIcon dimensions="24px" />
        }
        </LikeButton>
      </PostOwnerInfo>
    </PostContainer>
  )
}

export default Post;
