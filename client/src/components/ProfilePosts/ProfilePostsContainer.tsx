import { useEffect, useState } from "react";
import ProfilePostsPresentational from "./ProfilePostsPresentational";
import axios from "axios";
import config from "../../config.json";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPosts } from "../../features/posts/userPostsSlice";


const ProfilePostsContainer: React.FC = ({

}) => {
  const {posts, attachments} = useAppSelector((state) => state.userPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.get(`${config.serverUrl}posts`,
      { withCredentials: true }
    )
    .then(res => {
      dispatch(addPosts(res.data.posts));
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <ProfilePostsPresentational 
      userPosts={posts}
      postsAttachments={attachments}
    />
  )
}

export default ProfilePostsContainer;

