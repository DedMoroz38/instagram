import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import styled from "styled-components";
import config from "../../config.json";
import { width } from "@mui/system";


const PostImage = styled.img`
  display: flex;
  border-radius: 20px;
  width: 800px;
`;

interface Swiper{
  postAttachments: Array<{
    filename: string;
    id: number;
    postid: number
  }>
}

const FollowingPostsSwiper: React.FC<Swiper>= ({
  postAttachments
}) => {
  
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        style={{
          
        }}
      >
        {
          postAttachments.map((attachment) => (
            <SwiperSlide 
              key={attachment.id}
              style={{
                borderRadius: '20px',
              }}
            >
              <PostImage src={config.serverPostUrl + `${attachment.filename}`} alt="postImage"/>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}

export default FollowingPostsSwiper;