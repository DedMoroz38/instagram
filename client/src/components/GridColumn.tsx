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
  @media (max-width: 420px){
    width: 180px;
  }
`;


interface GridColumn{
  likingProp: any,
  followingsPostsFirstAttachments: {
    attachmentId: number;
    postId: number;
    firstPostAttachment: string;
    userPhoto: string;
  }[],
  columnPosts: any,
  modalProp: any
}

const GridColumn: React.FC<GridColumn> = ({
  likingProp,
  followingsPostsFirstAttachments,
  columnPosts,
  modalProp
}) =>  {
  return (
    <GridColumnContainer>
      {columnPosts.map((post: {postId: number, userName: string, userId: number}, index: number) => {

        const firstAttachment = 
        followingsPostsFirstAttachments
          .filter((attachment) => 
            attachment.postId === post.postId)[0];
        
        return (
          <Post 
            likingProp={likingProp}
            key={index}
            post={post}
            firstAttachment={firstAttachment}
            modalProp={modalProp}
          />
        )
      })}
    </GridColumnContainer>
  )
}

export default GridColumn;