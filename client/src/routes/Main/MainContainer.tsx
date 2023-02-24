import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import PostsPresentational from "./MainPresentational";
import { useAppSelector } from "../../app/hooks";
import { generateMasonryGrid } from "../../lib/main/generateMasonryGrid";
import { useGetSubscribersPosts } from "../../hooks/fetchHooks/main/useGetSubscribersPosts";

type ModalWindowContext = {
  setPostIdForModal: Dispatch<SetStateAction<number>>,
  postIdForModal: number,
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  onClose: () => void
}

export const ModalWindowContext = createContext<ModalWindowContext | null>(null);

const MainContainer: React.FC = () =>  {
  const {posts: followingsPosts, attachments: followingsPostsFirstAttachments} = useAppSelector((state) => state.followingsPosts);
  const [postsColumnState, setPostsColumnState] = useState<Array<JSX.Element>>([]);
  //For Modal window
  const [postIdForModal, setPostIdForModal] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const {loading} = useGetSubscribersPosts();

  const generateGrid = () => generateMasonryGrid(Math.trunc(window.innerWidth / 256), setPostsColumnState, followingsPosts, followingsPostsFirstAttachments);

  useEffect(() => {
    window.addEventListener("resize", () => {
      generateGrid();
    });
    generateGrid();

    return () => {
      window.removeEventListener("resize", generateGrid);
    }
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
        loading={loading}
      />
    </ModalWindowContext.Provider>
  )
}

export default MainContainer;