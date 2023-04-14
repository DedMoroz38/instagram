import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useErrorPopUpContext } from '../../../ContextProviders/ClienErrorHandlingProvider';
import { Errors } from '../../../lib/errors/Errors';

export const useGetSubscribersPosts = (
  functions: any,
  dependencyArray: any,
  url: string
  ): {loading: boolean, getPosts: () => void} =>  {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();

  const getPosts = (
    functions: any,
    posts: any,
    url: string
  ) => {
    if(posts.length > 0) return;
    setLoading(true);
    axios.get(url, 
      { withCredentials: true }
    )    
    .then(res => {
      if (res.data){
        const {posts, idOfLikedPosts, numberOfLikes} = res.data;
        dispatch(functions.addPosts(posts));
        dispatch(functions.addLikes(idOfLikedPosts));
        dispatch(functions.addNumberOfLikes(numberOfLikes[0]));
      }
    })
    .catch(err => {
      setErrorMessage(Errors.default);
      setErrorPopUpIsOpen(true);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    const [posts] = dependencyArray;
    getPosts(
      functions,
      posts,
      url
    );
  }, [...dependencyArray]);

  return {loading, getPosts};
};


