import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import styled from "styled-components";

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: scroll;
`;

interface Swiper {
  postImages: Array<string>,
}


const NewImagesSwiper: React.FC<Swiper> = ({
  postImages,
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
          postImages.map((image, index) => (
            <SwiperSlide key={index}>
              <PostImage src={image} alt="postImage"/>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}

export default NewImagesSwiper;