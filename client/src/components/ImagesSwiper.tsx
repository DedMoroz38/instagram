import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import styled from "styled-components";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: scroll;
`;

interface Swiper {
  newPostImages: Array<string>
}
// const navigationPrevRef = React.useRef(null)

//       const navigationNextRef = React.useRef(null)
//       return (
//         <Swiper
//           navigation={{
//             prevEl: navigationPrevRef.current,
//             nextEl: navigationNextRef.current,
//           }}
//          onBeforeInit={{
//               swiper.params.navigation.prevEl = navigationPrevRef.current;
//               swiper.params.navigation.nextEl = navigationNextRef.current;
//          }}
//         >
//           <SwiperSlide>slide 1</SwiperSlide>
//           <SwiperSlide>slide 2</SwiperSlide>
//           <div ref={navigationPrevRef} />
//           <div ref={navigationNextRef} />
//         </Swiper>

const ImagesSwiper: React.FC<Swiper> = ({
  newPostImages
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
          newPostImages.map((image, index) => (
            <SwiperSlide key={index}>
              <PostImage src={image} alt="postImage"/>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}

export default ImagesSwiper;