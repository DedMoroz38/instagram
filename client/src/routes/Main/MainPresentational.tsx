import { useState } from "react";
import styled from "styled-components";
import ModalWindowForPosts from "../../components/FollowingPostsComponents/ModalWindowForPosts";

const MainContainer = styled.div`
  position: relative;
  display: flex;
  padding: 16px 0;
  margin: 0 auto;
`;

interface Main {
  postsColumnState: Array<JSX.Element>
}

const MainPresentational: React.FC<Main> = ({
  postsColumnState,
}) =>  {

  return (
    <>
      <MainContainer>
        {
          postsColumnState.map(column => (
            column
          ))
        }
      </MainContainer>
      <ModalWindowForPosts />
    </>
  )
}

export default MainPresentational;


