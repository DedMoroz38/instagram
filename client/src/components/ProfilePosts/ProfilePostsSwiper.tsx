import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import styled from "styled-components";
import config from "../../config.json";


const PostImage = styled.img`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: scroll;
`;

interface Swiper {
  attachmentsArray: Array<{
    postId: number,
    attachmentId: number,
    fileName: string
  }>
}


const ProfilePostsSwiper: React.FC<Swiper> = ({
  attachmentsArray
}) => {

  return (
    <>
      <Swiper
        style={{width: '100%'}}
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {
          attachmentsArray.map((attachment) => (
            <SwiperSlide key={attachment.attachmentId}>
              <PostImage src={`${config.serverFilesUrl}postImages/${attachment.fileName}`} alt="postImage"/>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}

export default ProfilePostsSwiper;