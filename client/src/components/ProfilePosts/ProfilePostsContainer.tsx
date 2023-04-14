import { useEffect, useState } from "react";
import ProfilePostsPresentational from "./ProfilePostsPresentational";
import axios from "axios";
import config from "../../config.json";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetPosts } from "../../hooks/fetchHooks/profile/useGetPosts";
import { generateMasonryGrid } from "../../lib/main/generateMasonryGrid";
import { useGetSubscribersPosts } from "../../hooks/fetchHooks/main/useGetSubscribersPosts";
import {addPosts, addLikes, addNumberOfLikes, removeLike, decrementLikeNumber, incrementLikeNumber, addLike} from '../../features/posts/userPostsSlice';
import { useResize } from "../../hooks/useResize";

const ProfilePostsContainer: React.FC = ({

}) => {
  const {posts: userPosts, attachments: userPostsFirstAttachments} = useAppSelector((state) => state.userPosts);
  const functions = {addPosts, addLikes, addNumberOfLikes};
  const {posts: subscribersPosts} = useAppSelector((state) => state.userPosts);
  const {loading} = useGetSubscribersPosts(functions, [subscribersPosts], `posts/true`);
  const [postsColumnState, setPostsColumnState] = useState<Array<JSX.Element>>([]);
  const [postIdForModal, setPostIdForModal] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const likingProp = {
    for: 'userPosts',
    removeLike,
    decrementLikeNumber,
    incrementLikeNumber,
    addLike
  }

  const onClose = () => {
    if (!isOpen) return;
    setIsOpen(false);
  }

  const generateGrid = () => generateMasonryGrid(
    likingProp,
    setPostsColumnState,
    userPosts,
    userPostsFirstAttachments,
    {setPostIdForModal, setIsOpen}
  );

  useResize(generateGrid, userPosts);

  return (
    <ProfilePostsPresentational 
      postsColumnState={postsColumnState}
      loading={loading}
      modalProp={{isOpen, onClose, postIdForModal}}
      likingProp={likingProp}
    />
  )
}

export default ProfilePostsContainer;

