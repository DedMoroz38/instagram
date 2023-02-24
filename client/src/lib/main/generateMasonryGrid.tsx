import { Dispatch, SetStateAction } from "react";
import GridColumn from "../../components/GridColumn";

type generateMasonryGrid = (
  numberOfColumns: number,
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
}[]
) => void

export const generateMasonryGrid: generateMasonryGrid = (
  numberOfColumns,
  setPostsColumnState,
  followingsPosts,
  followingsPostsFirstAttachments
) => {
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
        key={i}
        columnPosts={columnPosts}
        followingsPostsFirstAttachments={followingsPostsFirstAttachments}
      />
    setPostsColumnState(prev => [...prev, postsColumn]);
  }
}