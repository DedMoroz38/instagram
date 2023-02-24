import { useEffect } from 'react';
import { addLikes, addPosts } from '../../../features/posts/followingsPostsSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {useFetch} from '../useFetch';

export const useGetSubscribersPosts = (): {loading: boolean} =>  {
  const dispatch = useAppDispatch();
  const {posts: subscribersPosts} = useAppSelector((state) => state.followingsPosts);
  
  const {loading, response, error} = useFetch({
    method: 'get',
    url: "posts/getSubscribersPosts"
  });

  useEffect(() => {
    if (response !== null) {
      dispatch(addPosts(response.posts));
      dispatch(addLikes(response.idOfLikedPosts))
    }
  }, [response]);

  

  return {loading};
};


