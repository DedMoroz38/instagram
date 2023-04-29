import styled from "styled-components";
import { IdentityIcon, LikeBorderIcon, LikeIcon } from "./StyledIcons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { likePost } from "../lib/likes/like";
import ThreeDotsMenu from "./ThreeDotsMenu";
import { Link } from "react-router-dom";


const PostContainer = styled.div`
  outline: none !important;
  flex-shrink: 0;
  width: 236px;
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
  cursor: pointer;
  @media (max-width: 420px){
    width: 180px;
  }
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
`;
const PostOwnerUsername = styled(Link)`
  color: ${({theme}) => theme.color};
  font-weight: 400;
  margin-left: 10px;
  text-decoration: none;
  @media (max-width: 420px){
    width: 50%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const LikeContainer = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  right: 10px;
`
export const NumberOfLikes = styled.p`
  color: ${({theme}) => theme.color};
  font-weight: 400;
`;

export const LikeButton = styled.button`
  &:focus{
    -webkit-tap-highlight-color: transparent;
  }
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  cursor: pointer;
  border: none;
  margin-left: 2px;
`;  

interface Post{
  likingProp: any,
  post: any,
  firstAttachment: {
    attachmentId: number;
    postId: number;
    firstPostAttachment: string;
    userPhoto: string;
  },
  modalProp: any
}


const Post: React.FC<Post> = ({
  likingProp,
  post,
  firstAttachment,
  modalProp
}) =>  {
  const {likes: listOfIdsOfLikedPosts, numberOfLikes} = useAppSelector(state => state[likingProp.for]);
  const {postId, userName, userId} = post;
  const dispatch = useAppDispatch();
  const {
    setPostIdForModal,
    setIsOpen,
  } = modalProp;

  const openModal = () => {

    setPostIdForModal(postId);
    setIsOpen(true);
  }

  const like = (postId: number) => {
    likePost(postId, likingProp, dispatch, listOfIdsOfLikedPosts);
  }

  return (
    <PostContainer key={postId}>
      <PostImage 
        onClick={() => openModal()}
        src={`${process.env.REACT_APP_IMAGES_URL}postImages/${firstAttachment.firstPostAttachment}`} 
        alt="postsAttachment" 
      />
      <PostOwnerInfo>
        {
          firstAttachment.userPhoto !== null ?
          <PostOwnerPhoto
            src={`${process.env.REACT_APP_IMAGES_URL}users/${firstAttachment.userPhoto}`}
            alt="owners photo"
          /> :
          <IdentityIcon dimensions="30px" />
        }
        <PostOwnerUsername
          to={`/${userId}`}
        >{userName}</PostOwnerUsername>
        <LikeContainer>
          <NumberOfLikes>{numberOfLikes[`${postId}`]}</NumberOfLikes>
          <LikeButton onClick={() => like(postId)}>
          {
            listOfIdsOfLikedPosts.includes(postId) ?
            <LikeIcon dimensions="24px" /> :
            <LikeBorderIcon dimensions="24px" />
          }
          </LikeButton>
        </LikeContainer>
      </PostOwnerInfo>
      {
        likingProp.for === 'userPosts' &&
        <ThreeDotsMenu postId={postId} />
      }
    </PostContainer>
  )
}

export default Post;
