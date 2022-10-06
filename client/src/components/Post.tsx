import { useContext } from "react";
import styled from "styled-components";
import config from "../config.json";
import { ModalWindowContext } from "../routes/Main/MainContainer";

const PostContainer = styled.div`
  width: 236px;
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
  &:hover > img{
    filter: brightness(60%);
  }
`;

const PostImage = styled.img`
  transition: all 0.2s;
  width: 100%;
  border-radius: 20px;
`;

const PostOwnerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  padding-left: 10px;
`;
const PostOwnerPhoto = styled.img`
  width: 32px;
  border-radius: 50%;
  margin-right: 10px;
`;
const PostOwnerUsername = styled.p`
  color: ${({theme}) => theme.color};
  font-weight: 100;
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

  const {
    setPostIdForModal,
    setIsOpen,
  } = useContext(ModalWindowContext);

  const openModal = () => {
    setPostIdForModal(postId);
    setIsOpen(true);
  }


  return (
    <PostContainer key={postId}>
      <PostImage 
        onClick={() => openModal()}
        src={`${config.serverFilesUrl}postImages/${firstAttachment.firstPostAttachment}`} 
        alt="postsAttachment" 
      />
      <PostOwnerInfo>
        <PostOwnerPhoto
          src={`${config.serverFilesUrl}users/${firstAttachment.userPhoto}`}
          alt="postOwnerPhoto"
        />
        <PostOwnerUsername>{userName}</PostOwnerUsername>
      </PostOwnerInfo>
    </PostContainer>
  )
}

export default Post;