import axios from "axios";
import { useEffect, useState } from "react";
import PostsPresentational from "./MainPresentational";
import config from "../../config.json";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPosts } from "../../features/posts/followingsPostsSlice";
import GridColumn from "../../components/GridColumn";
import React from "react";

export const ModalWindowContext = React.createContext<any>(null);

const MainContainer: React.FC = () =>  {
  const {posts: followingsPosts, attachments: followingsPostsAttachments} = useAppSelector((state) => state.followingsPosts);
  const [postsColumnState, setPostsColumnState] = useState<Array<JSX.Element>>([]);
  const dispatch = useAppDispatch();
  //For Modal window
  const [postIdForModal, setPostIdForModal] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  

  useEffect(() => {
    axios.get(`${config.serverUrl}posts/getUserFollowingPosts`, 
    { 
      withCredentials: true
    })    
    .then(res => {
      dispatch(addPosts(res.data.posts));
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

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
        let columnPosts: Array<{
          postId: number;
          userName: string;
        }> = columnWrappers[`column${i}`];

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
    <ModalWindowContext.Provider value={{
      setPostIdForModal,
      postIdForModal,
      isOpen,
      setIsOpen,
      onClose
    }}>
      <PostsPresentational 
        postsColumnState={postsColumnState}
      />
    </ModalWindowContext.Provider>
  )
}

export default MainContainer;