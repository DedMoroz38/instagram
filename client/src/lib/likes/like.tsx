import axios from "axios";
import React from "react";
import { useErrorPopUpContext } from "../../ContextProviders/ClienErrorHandlingProvider";
import { Errors } from "../errors/Errors";



export const useLike = (
  postId: number,
  likingFunctions: any,
  dispatch: any,
  listOfIdsOfLikedPosts: number[]
) => {
  // const {setIsOpen: setErrorPopUpIsOpen, setErrorMessage} = useErrorPopUpContext();

  axios.get(`${process.env.REACT_APP_SERVER_URL}posts/like/${postId}`,
    { withCredentials: true }
  )
  .then(res => {
    if(listOfIdsOfLikedPosts.includes(postId)){
      const postIdIndex = listOfIdsOfLikedPosts.indexOf(postId);
      dispatch(likingFunctions.removeLike(postIdIndex));
      dispatch(likingFunctions.decrementLikeNumber(postId))
    } else {
      dispatch(likingFunctions.addLike(postId));
      dispatch(likingFunctions.incrementLikeNumber(postId))
    }
  }).catch(err => {
    // setErrorMessage(Errors.default);
    // setErrorPopUpIsOpen(true);
  })
}