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
  followingsPostsFirstAttachments: {
    attachmentId: number;
    postId: number;
    firstPostAttachment: string;
    userPhoto: string;
  }[],
  columnPosts: any
}

// TODO - re-think modal window implementation
const GridColumn: React.FC<GridColumn> = ({
  followingsPostsFirstAttachments,
  columnPosts
}) =>  {


  return (
    <GridColumnContainer>
      {columnPosts.map((post: {postId: number, userName: string}, index: number) => {

        const firstAttachment = 
        followingsPostsFirstAttachments
          .filter((attachment) => 
            attachment.postId === post.postId)[0];
        
        const {postId, userName} = post;
        return (
          <Post 
            key={index}
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