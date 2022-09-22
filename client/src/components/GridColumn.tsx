import styled from "styled-components";
import config from "../config.json";

const GridColumnContainer = styled.div`
  width: 236px;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  &:last-of-type{
    margin-right: 0;
  }
`;

const Post = styled.div`
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

interface GridColumn{
  followingsPostsAttachments: {
    attachmentId: number;
    postId: number;
    firstPostAttachment: string;
    userPhoto: string;
  }[],
  columnPosts: any
}

const GridColumn: React.FC<GridColumn> = ({
  followingsPostsAttachments,
  columnPosts
}) =>  {
  

  return (
    <GridColumnContainer>
      {columnPosts.map((post: any) => {
        const attachment = 
          followingsPostsAttachments
          .filter((attachment) => 
            attachment.postId === post.postId)[0];

        return (
          <Post>
            <PostImage 
              src={`${config.serverFilesUrl}postImages/${attachment.firstPostAttachment}`} 
              alt="postsAttachment" 
            />
            <PostOwnerInfo>
              <PostOwnerPhoto
                src={`${config.serverFilesUrl}users/${attachment.userPhoto}`}
                alt="postOwnerPhoto"
              />
              <PostOwnerUsername>{post.userName}</PostOwnerUsername>
            </PostOwnerInfo>
          </Post>
        )
      })}
    </GridColumnContainer>
  )
}

export default GridColumn;