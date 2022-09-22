import styled from "styled-components";
import ProfilePostsSwiper from "./ProfilePostsSwiper";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-auto-rows: 250px;
  grid-gap: 20px;
`;

interface ProfilePosts{
  userPosts: Array<number>,
  postsAttachments: Array<{
    attachmentId: number,
    postId: number
    fileName: string
  }>
}

const ProfilePostsPresentational: React.FC<ProfilePosts> = ({
  userPosts,
  postsAttachments
}) => {
  console.log(userPosts);
  return (
    <MainContainer>
      <h1 style={{marginBottom: '30px'}}>Posts</h1>
      <PostsContainer>
        {
          userPosts.map((postId) => (
            <div key={postId}>
              <ProfilePostsSwiper attachmentsArray={
                postsAttachments
                .filter((attachment) => 
                        attachment.postId === postId
                )
              } />
            </div>
          ))
        }
      </PostsContainer>
    </MainContainer>
  )
}

export default ProfilePostsPresentational;