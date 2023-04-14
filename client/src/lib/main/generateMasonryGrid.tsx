import { Dispatch, SetStateAction } from "react";
import GridColumn from "../../components/GridColumn";

type generateMasonryGrid = (
  likingFunctions: any,
  setPostsColumnState: Dispatch<SetStateAction<JSX.Element[]>>,
  followingsPosts: {
    postId: number;
    userName: string;
  }[],
  followingsPostsFirstAttachments: {
    attachmentId: number;
    postId: number;
    firstPostAttachment: string;
    userPhoto: string;
  }[],
  modalProp: any
) => void

export const generateMasonryGrid: generateMasonryGrid = (
  likingProp,
  setPostsColumnState,
  followingsPosts,
  followingsPostsFirstAttachments,
  modalProp
) => {
  const width = window.innerWidth;
  const divider = width <= 420 ? 180 : 256;
  const numberOfColumns = Math.trunc(width / divider);
  setPostsColumnState([]);
  let columnWrappers: any = {};

  for (let i = 0; i < numberOfColumns; i++) {
    columnWrappers[`column${i}`] = [];
  }

  for (let i = 0; i < followingsPosts.length; i++) {
    const column = i % numberOfColumns;
    columnWrappers[`column${column}`].push(followingsPosts[i]);
  }
  for (let i = 0; i < numberOfColumns; i++) {
    let columnPosts: Array<{
      postId: number;
      userName: string;
    }> = columnWrappers[`column${i}`];
    let postsColumn: JSX.Element = 
      <GridColumn
        likingProp={likingProp}
        key={i}
        columnPosts={columnPosts}
        followingsPostsFirstAttachments={followingsPostsFirstAttachments}
        modalProp={modalProp}
      />
    setPostsColumnState(prev => [...prev, postsColumn]);
  }
}