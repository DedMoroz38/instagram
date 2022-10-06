import styled from "styled-components";
import Post from "./Post";

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


interface GridColumn{
  followingsPostsAttachments: {
    attachmentId: number;
    postId: number;
    firstPostAttachment: string;
    userPhoto: string;
  }[],
  columnPosts: any
}

// TODO - re-think modal window implementation
const GridColumn: React.FC<GridColumn> = ({
  followingsPostsAttachments,
  columnPosts
}) =>  {


  return (
    <GridColumnContainer>
      {columnPosts.map((post: {postId: number, userName: string}) => {

        const firstAttachment = 
          followingsPostsAttachments
          .filter((attachment) => 
            attachment.postId === post.postId)[0];
        
        const {postId, userName} = post;
        return (
          <Post 
            postId={postId}
            userName={userName}
            firstAttachment={firstAttachment}
          />
        )
      })}
    </GridColumnContainer>
  )
}

export default GridColumn;