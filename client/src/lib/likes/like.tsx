import axios from "axios";



export const likePost = (
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