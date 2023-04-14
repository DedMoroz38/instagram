import { CircularProgress } from "material-ui";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { generateMasonryGrid } from "../../lib/main/generateMasonryGrid";
import ModalWindowForPosts from "../FollowingPostsComponents/ModalWindowForPosts";
import { CircularLoaidng } from "../StyledIcons";
import ProfilePostsSwiper from "./ProfilePostsSwiper";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const PostsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const Line = styled.hr`
  transition: all 0.3s linear;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    ${({theme}) => theme.profile.hr},
    rgba(0, 0, 0, 0)
  );
  width: 90vw;
  margin-bottom: 20px;
`

interface ProfilePosts{
  postsColumnState: Array<JSX.Element>,
  loading: boolean,
  modalProp: any,
  likingProp: any
}

const ProfilePostsPresentational: React.FC<ProfilePosts> = ({
  loading,
  postsColumnState,
  modalProp,
  likingProp
}) => {

  return (
    <>
      <MainContainer>
        <Line />
        {
          loading ? 
          <CircularLoaidng dimensions="50px" />:
          <>
            <PostsContainer>
              {         
                postsColumnState.map(column => (
                  column
                ))
              }
            </PostsContainer>
          </>
        }
      </MainContainer>
      <ModalWindowForPosts 
        modalProp={modalProp}
        likingProp={likingProp}
       />
    </>
  )
}

export default ProfilePostsPresentational;