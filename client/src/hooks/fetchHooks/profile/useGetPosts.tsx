import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useErrorPopUpContext } from "../../../ContextProviders/ClienErrorHandlingProvider";
import { addPosts } from "../../../features/posts/userPostsSlice";
import { Errors } from "../../../lib/errors/Errors";

export const useGetPosts = (): {loading: boolean} => {
  const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const posts = useAppSelector(state => state.userPosts.posts);

  useEffect(() => {
    if (posts.length === 0){
      setLoading(true);
      axios.get(`${process.env.REACT_APP_SERVER_URL}posts`,
        { withCredentials: true }
      )
      .then(res => {
        dispatch(addPosts(res.data.posts));
      })
      .catch(err => {
        setErrorMessage(Errors.default);
        setErrorPopUpIsOpen(true);
      })
      .finally(() => {
        setLoading(false);
      })
    }
  }, []);

  return {loading}
}