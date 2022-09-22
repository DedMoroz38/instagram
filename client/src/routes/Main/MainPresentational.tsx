import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import GridColumn from "../../components/GridColumn";

const MainContainer = styled.div`
  position: relative;
  display: flex;
  padding: 16px 0;
  margin: 0 auto;
`;



interface Main {
  postsColumnState: Array<JSX.Element>,
  setPostsColumnState: Dispatch<SetStateAction<JSX.Element[]>>,
  followingsPosts: {
    postId: number;
    userName: string;
  }[],
  followingsPostsAttachments: {
    attachmentId: number,
    postId: number,
    firstPostAttachment: string,
    userPhoto: string
  }[]
}

const MainPresentational: React.FC<Main> = ({
  postsColumnState,
  setPostsColumnState,
  followingsPosts,
  followingsPostsAttachments
}) =>  {
  useEffect(() => {

    const generateMasonryGrid = (columns: any) => {
      setPostsColumnState([]);
      let columnWrappers: any = {};

      for (let i = 0; i < columns; i++) {
        columnWrappers[`column${i}`] = [];
      }

      for (let i = 0; i < followingsPosts.length; i++) {
        const column = i % columns;
        columnWrappers[`column${column}`].push(followingsPosts[i]);
      }
      for (let i = 0; i < columns; i++) {
        let columnPosts = columnWrappers[`column${i}`];

        let postsColumn: JSX.Element = 
          <GridColumn
            key={i}
            columnPosts={columnPosts}
            followingsPostsAttachments={followingsPostsAttachments}
          />
        setPostsColumnState(prev => [...prev, postsColumn]);
      }
    }

    window.addEventListener("resize", () => {
      generateMasonryGrid(Math.trunc(window.innerWidth / 256));
    });
    generateMasonryGrid(Math.trunc(window.innerWidth / 256));
  }, [followingsPosts]);

  return (
    <MainContainer>
      {
        postsColumnState.map(column => (
          column
        ))
      }
    </MainContainer>
  )
}

export default MainPresentational;

