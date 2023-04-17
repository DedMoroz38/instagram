import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ProfilePostsPresentational from '../../components/ProfilePosts/ProfilePostsPresentational';
import { addLike, decrementLikeNumber, incrementLikeNumber, removeLike, resetPosts } from '../../features/posts/accountPostsSlice';
import { addLikes, addNumberOfLikes, addPosts } from '../../features/posts/accountPostsSlice';
import { useGetSubscribersPosts } from '../../hooks/fetchHooks/main/useGetSubscribersPosts';
import { useResize } from '../../hooks/useResize';
import { generateMasonryGrid } from '../../lib/main/generateMasonryGrid';

const AccountPostsContainer = () => {
  const { userId } = useParams();
  const functions = {addPosts, addLikes, addNumberOfLikes};
  const [postsColumnState, setPostsColumnState] = useState<Array<JSX.Element>>([]);
  const {posts: accountPosts, attachments: accountPostsFirstAttachments} = useAppSelector((state) => state.accountPosts);
  const {loading} = useGetSubscribersPosts(functions, [accountPosts, userId], `posts/getByUserId/${userId}`);
  const [postIdForModal, setPostIdForModal] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetPosts());
  }, [userId]);

  const likingProp = {
    for: 'accountPosts',
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
    accountPosts,
    accountPostsFirstAttachments,
    {setPostIdForModal, setIsOpen}
  );

  useResize(generateGrid, accountPosts);

  return (
    <ProfilePostsPresentational 
      postsColumnState={postsColumnState}
      loading={loading}
      modalProp={{isOpen, onClose, postIdForModal}}
      likingProp={likingProp}
    />
  )
}

export default AccountPostsContainer;