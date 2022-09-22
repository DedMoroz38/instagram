import axios from "axios";
import { useEffect, useState } from "react";
import PostsPresentational from "./MainPresentational";
import config from "../../config.json";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPosts } from "../../features/posts/followingsPostsSlice";


const MainContainer: React.FC = () =>  {
  const {posts: followingsPosts, attachments: followingsPostsAttachments} = useAppSelector((state) => state.followingsPosts);
  const [postsColumnState, setPostsColumnState] = useState<Array<JSX.Element>>([]);
  const dispatch = useAppDispatch();

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

  return (
    <PostsPresentational 
      postsColumnState={postsColumnState}
      setPostsColumnState={setPostsColumnState}
      followingsPosts={followingsPosts}
      followingsPostsAttachments={followingsPostsAttachments}
    />
  )
}

export default MainContainer;