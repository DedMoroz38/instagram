import { useEffect, useState } from "react";
import PostsPresentational from "./PostsPresentational";
import axios from "axios";
import config from "../../config.json";


const PostsContainer: React.FC = ({
  
}) => {
  const [posts, setPosts] = useState<RegExpMatchArray | null>([]);

  const ExtractImagesFilenamesFromString = (allPosts: Array<string>): void => {
    for(let post of allPosts){
      const RegExp = /[a-z0-9.-]+/g;
      const arrayOfImages = post.match(RegExp);
      // console.log(...arrayOfImages)
      // setPosts([...arrayOfImages])
    }
  }

  useEffect(() => {
    axios.get(`${config.serverUrl}posts`,
      { withCredentials: true }
    ) 
    .then(res => {
      ExtractImagesFilenamesFromString(res.data.posts.images);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <PostsPresentational />
  )
}

export default PostsContainer;